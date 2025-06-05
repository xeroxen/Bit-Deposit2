import { NextRequest, NextResponse } from 'next/server'

// Team data interface
interface TeamData {
  id: string;
  name: string;
  runs: number;
  wickets: number;
  winner: boolean;
  totalscore: string;
  odds: number;
}

// Match interface
interface Match {
  matchId: string;
  status: string;
  home: TeamData;
  away: TeamData;
  winnerId?: string | null;
}

// Cache interface
interface CacheData {
  data: Match[];
  timestamp: number;
}

// In-memory cache with better initialization
let cache: CacheData | null = null;

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to validate match data
function isValidMatchData(data: unknown): data is Match[] {
  if (!Array.isArray(data)) return false;
  return data.every(match => 
    match && 
    typeof match.matchId === 'string' &&
    typeof match.status === 'string' &&
    match.home && typeof match.home.id === 'string' &&
    match.away && typeof match.away.id === 'string'
  );
}

// Helper function to check if cache is expired
function isCacheExpired(): boolean {
  if (!cache) return true;
  return Date.now() - cache.timestamp > CACHE_DURATION;
}

// Helper function to compare match arrays for differences
function isDataDifferent(newData: Match[], cachedData: Match[]): boolean {
  if (newData.length !== cachedData.length) return true;
  
  // Sort both arrays by matchId for consistent comparison
  const sortedNew = [...newData].sort((a, b) => a.matchId.localeCompare(b.matchId));
  const sortedCached = [...cachedData].sort((a, b) => a.matchId.localeCompare(b.matchId));
  
  return JSON.stringify(sortedNew) !== JSON.stringify(sortedCached);
}

export async function GET() {
  try {
    const cacheExpired = isCacheExpired();
    console.log(`[Cache] GET request - Cache exists: ${cache !== null}, Expired: ${cacheExpired}`);
    
    // If cache exists and is not expired, serve cached data
    if (cache && !cacheExpired) {
      console.log(`[Cache] Serving ${cache.data.length} cached cricket matches (age: ${Date.now() - cache.timestamp}ms)`);
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
          'X-Cache-Status': 'HIT',
          'X-Cache-Age': `${Date.now() - cache.timestamp}ms`,
          'X-Cache-Count': cache.data.length.toString(),
          'X-Cache-Remaining': `${CACHE_DURATION - (Date.now() - cache.timestamp)}ms`
        }
      });
    }

    console.log('[Cache] Cache expired or missing, fetching fresh cricket matches data from external API');
    
    // Fetch fresh data from external API
    const apiUrl = `${process.env.NEXT_PUBLIC_SPORTS_API_URL}api/cricket/matches`;
    console.log(`[API] Fetching from: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'NextJS-Server',
        'Accept': 'application/json'
      }
    });

    console.log(`[API] Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`External API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API] Received ${Array.isArray(data) ? data.length : 'invalid'} matches`);

    // Validate the data structure
    if (!isValidMatchData(data)) {
      console.error('[API] Invalid data structure received:', data);
      throw new Error('Invalid data structure received from API');
    }

    // Check if API returned empty array - don't update cache if so
    if (data.length === 0) {
      console.log('[Cache] API returned empty array, not updating cache');
      
      // If we have cached data, serve it even if expired
      if (cache) {
        console.log(`[Cache] Serving ${cache.data.length} cached matches due to empty API response (age: ${Date.now() - cache.timestamp}ms)`);
        return NextResponse.json(cache.data, {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            'X-Cache-Status': 'STALE_EMPTY_API',
            'X-Cache-Age': `${Date.now() - cache.timestamp}ms`,
            'X-Cache-Count': cache.data.length.toString()
          }
        });
      }
      
      // No cache and empty API response
      return NextResponse.json([], {
        headers: {
          'Cache-Control': 'no-cache',
          'X-Cache-Status': 'EMPTY_API'
        }
      });
    }

    // Check if new data is different from cached data
    let shouldUpdateCache = true;
    let cacheStatus = 'MISS';
    
    if (cache && !isDataDifferent(data, cache.data)) {
      console.log('[Cache] New data is identical to cached data, refreshing timestamp only');
      cache.timestamp = Date.now(); // Refresh the cache timestamp
      shouldUpdateCache = false;
      cacheStatus = 'REFRESHED_TIMESTAMP';
    } else if (cache) {
      console.log('[Cache] New data differs from cached data, updating cache');
      cacheStatus = 'UPDATED';
    }
    
    // Update cache with fresh data if it's different or if no cache exists
    if (shouldUpdateCache) {
      cache = {
        data,
        timestamp: Date.now()
      };
      console.log(`[Cache] Successfully cached ${data.length} cricket matches`);
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Cache-Status': cacheStatus,
        'X-Cache-Count': data.length.toString(),
        'X-Cache-Remaining': `${CACHE_DURATION}ms`
      }
    });

  } catch (error) {
    console.error('[Cache] Error fetching cricket matches:', error);
    
    // If we have cached data, serve it as fallback regardless of expiry
    if (cache) {
      console.log(`[Cache] Serving ${cache.data.length} cached matches due to API error (age: ${Date.now() - cache.timestamp}ms)`);
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-Cache-Status': 'FALLBACK',
          'X-Cache-Age': `${Date.now() - cache.timestamp}ms`,
          'X-Cache-Count': cache.data.length.toString()
        }
      });
    }

    // No cache available, return error
    console.error('[Cache] No cache available, returning error');
    return NextResponse.json(
      { 
        error: 'Failed to fetch cricket matches',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}

// Refresh cache with new data from API
export async function PUT() {
  try {
    console.log('[Cache] PUT request - Manually refreshing cache');
    
    const apiUrl = `${process.env.NEXT_PUBLIC_SPORTS_API_URL}api/cricket/matches`;
    console.log(`[API] Refreshing from: ${apiUrl}`);
    
    // Fetch fresh data from external API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'NextJS-Server-Refresh',
        'Accept': 'application/json'
      }
    });

    console.log(`[API] Refresh response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`External API failed: ${response.status} ${response.statusText}`);
    }

    const newData = await response.json();
    console.log(`[API] Refresh received ${Array.isArray(newData) ? newData.length : 'invalid'} matches`);

    // Validate the data structure
    if (!isValidMatchData(newData)) {
      console.error('[API] Invalid data structure received during refresh:', newData);
      throw new Error('Invalid data structure received from API during refresh');
    }

    // Don't update cache if API returns empty array
    if (newData.length === 0) {
      console.log('[Cache] PUT refresh received empty array, not updating cache');
      return NextResponse.json({
        message: 'Refresh skipped - API returned empty array',
        cachePreserved: true,
        currentCacheCount: cache?.data.length || 0,
        timestamp: new Date().toISOString()
      }, {
        headers: {
          'X-Cache-Status': 'EMPTY_REFRESH_SKIPPED',
          'X-Cache-Count': (cache?.data.length || 0).toString()
        }
      });
    }

    const oldCacheCount = cache?.data.length || 0;
    const oldCacheTime = cache?.timestamp || 0;
    
    // Update cache with fresh data
    cache = {
      data: newData,
      timestamp: Date.now()
    };

    console.log(`[Cache] Refresh successful: ${oldCacheCount} -> ${newData.length} matches`);

    return NextResponse.json({
      message: 'Cache refreshed successfully',
      oldCount: oldCacheCount,
      newCount: newData.length,
      oldCacheAge: oldCacheTime ? `${Date.now() - oldCacheTime}ms` : 'N/A',
      timestamp: new Date().toISOString(),
      data: newData
    }, {
      headers: {
        'X-Cache-Status': 'REFRESHED',
        'X-Cache-Count': newData.length.toString()
      }
    });

  } catch (error) {
    console.error('[Cache] Error refreshing cache:', error);
    return NextResponse.json(
      { 
        error: 'Failed to refresh cache',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Add a POST endpoint to manually set cache data (for debugging)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!isValidMatchData(body)) {
      return NextResponse.json(
        { error: 'Invalid data structure provided' },
        { status: 400 }
      );
    }

    // Don't set cache if provided data is empty array
    if (body.length === 0) {
      return NextResponse.json(
        { error: 'Cannot set cache with empty array' },
        { status: 400 }
      );
    }

    cache = {
      data: body,
      timestamp: Date.now()
    };

    console.log(`[Cache] POST request - Manually set cache with ${body.length} matches`);

    return NextResponse.json({
      message: 'Cache set successfully',
      count: body.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Cache] Error setting cache via POST:', error);
    return NextResponse.json(
      { error: 'Failed to set cache data' },
      { status: 500 }
    );
  }
} 