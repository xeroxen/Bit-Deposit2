'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { getUserData, getAuthToken } from '@/lib/authentication';
import { format, parseISO } from 'date-fns';
import { Loader2, AlertCircle } from 'lucide-react';

interface BetHistoryItem {
  id: number;
  user_id: string;
  match_id: string;
  team_id: string;
  odd: string;
  ammount: string;
  result: string;
  created_at: string;
  updated_at: string | null;
}

export default function BetHistoryPage() {
  const { isAuthenticated, loading, redirectToLogin } = useAuth();
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect if authentication has finished loading and user is not authenticated
    if (!loading && !isAuthenticated) {
      redirectToLogin();
      return;
    }

    // Only fetch bet history if user is authenticated
    if (isAuthenticated) {
      const fetchBetHistory = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          const userData = getUserData();
          const userId = userData?.id || '';
          const token = getAuthToken();
          
          // Direct fetch to API without /api prefix
          const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_LIST_API_URL}/story/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }),
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch bet history');
          }
          
          const data = await response.json();
          setBetHistory(data.data);
        } catch (err) {
          console.error('Error fetching bet history:', err);
          setError('Failed to load bet history. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchBetHistory();
    }
  }, [isAuthenticated, loading, redirectToLogin]);

  const getStatusColor = (result: string) => {
    switch(result.toLowerCase()) {
      case 'win': return 'bg-green-100 text-green-800';
      case 'lose': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0000-00-00 00:00:00') {
      return 'Pending';
    }
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Bet History</h1>
        <p className="text-white/80 mt-2">Track all your betting activity in one place</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <span className="ml-4 text-lg text-gray-600">Verifying your account...</span>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <span className="ml-4 text-lg text-gray-600">Loading your bet history...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
      ) : betHistory.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No bet history found</h3>
          <p className="mt-1 text-gray-500">You haven&apos;t placed any bets yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Odds
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {betHistory.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{bet.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.match_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.team_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {parseFloat(bet.odd).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      ${parseFloat(bet.ammount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(bet.result)}`}>
                        {bet.result === "no" ? "Pending" : bet.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(bet.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
