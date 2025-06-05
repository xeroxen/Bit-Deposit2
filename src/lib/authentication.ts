import Cookies from 'js-cookie';
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export interface User {
    id: number;
    name: string;
    user_name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    oauth_id: string | null;
    oauth_type: string | null;
    avatar: string | null;
    last_name: string | null;
    cpf: string | null;
    phone: string;
    logged_in: number;
    banned: number;
    inviter: string | null;
    inviter_code: string | null;
    affiliate_revenue_share: number;
    affiliate_revenue_share_fake: string | null;
    affiliate_cpa: string;
    affiliate_baseline: string;
    is_demo_agent: number;
    status: string;
    language: string;
    role_id: number;
    dateHumanReadable: string;
    createdAt: string;
    totalLikes: number;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
    expires_in: number;
}

/**
 * Get the authentication token from cookies
 */
export const getAuthToken = (): string | undefined => {
    return Cookies.get('access_token');
};

/**
 * Store user data after successful login
 */
export const storeUserData = (loginResponse: LoginResponse): void => {
    // Store access token in cookies with 2-hour expiry
    Cookies.set('access_token', loginResponse.access_token, { expires: 1 / 12 });
    
    // Store user data in localStorage (only in browser environment)
    if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(loginResponse.user));
        
        // Set a flag in local storage to notify other tabs
        localStorage.setItem('auth_status_changed', Date.now().toString());
        
        // Dispatch custom event for same-tab components
        window.dispatchEvent(new CustomEvent('auth_status_changed', { 
            detail: { authenticated: true, timestamp: Date.now() } 
        }));

        // Trigger balance update after successful login
        window.dispatchEvent(new CustomEvent('balanceUpdated'));
    }
    
    // Store user ID in cookies as backup
    Cookies.set('user_id', loginResponse.user.id.toString(), { expires: 1 / 12 });
};

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return response.json();
};

/**
 * Trigger balance update event to notify components
 */
export const triggerBalanceUpdate = (): void => {
    if (typeof window !== 'undefined') {
        // Dispatch a custom event to notify components about balance change
        window.dispatchEvent(new CustomEvent('balanceUpdated', { 
            detail: { timestamp: Date.now() } 
        }));
        
        // Also set a flag in localStorage for cross-tab synchronization
        localStorage.setItem('balance_updated', Date.now().toString());
    }
};

/**
 * Check if the user is currently authenticated
 */
export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return !!token;
};

/**
 * Logout user by removing auth token and user data
 */
export const logout = (): void => {
    // Remove auth token from cookies
    Cookies.remove('access_token');
    Cookies.remove('user_id');
    
    // Remove user data from localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
        
        // Set a flag in local storage to notify other tabs
        localStorage.setItem('auth_status_changed', Date.now().toString());
        
        // Dispatch custom event for same-tab components
        window.dispatchEvent(new CustomEvent('auth_status_changed', { 
            detail: { authenticated: false, timestamp: Date.now() } 
        }));
    }
};

/**
 * Redirect to login page if user is not authenticated
 */
export const redirectToLogin = (): void => {
    if (typeof window !== 'undefined' && !isAuthenticated()) {
        window.location.href = '/login';
    }
};

/**
 * Get the current user data from localStorage
 */
export const getUserData = (): User | null => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }
    return null;
};
