import Cookies from 'js-cookie';
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`


/**
 * Get the authentication token from cookies
 */
export const getAuthToken = (): string | undefined => {
    return Cookies.get('access_token');
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
