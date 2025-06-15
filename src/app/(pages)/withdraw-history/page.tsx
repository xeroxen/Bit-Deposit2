'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { getUserData, getAuthToken } from '@/lib/authentication';
import { format, parseISO } from 'date-fns';
import { Loader2, AlertCircle } from 'lucide-react';

interface WithdrawHistoryItem {
  id: number;
  payment_id: string | null;
  user_id: number;
  amount: string;
  type: string;
  proof: string | null;
  status: number;
  pix_key: string | null;
  pix_type: string | null;
  bank_info: string | null;
  currency: string | null;
  symbol: string | null;
  recever_number: string;
  created_at: string;
  updated_at: string;
}

export default function WithdrawHistoryPage() {
  const { isAuthenticated, loading, redirectToLogin } = useAuth();
  const [withdrawHistory, setWithdrawHistory] = useState<WithdrawHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only redirect if authentication has finished loading and user is not authenticated
    if (!loading && !isAuthenticated) {
      redirectToLogin();
      return;
    }

    // Only fetch withdraw history if user is authenticated
    if (isAuthenticated) {
      const fetchWithdrawHistory = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const userData = getUserData();
          const userId = userData?.id || '';
          const token = getAuthToken();

          const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_LIST_API_URL}/wdraw-story/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }),
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch withdraw history');
          }

          const data = await response.json();
          // Updated to match your API response structure
          setWithdrawHistory(data.withdrawals || []);
        } catch (err) {
          console.error('Error fetching withdraw history:', err);
          setError('Failed to load withdraw history. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchWithdrawHistory();
    }
  }, [isAuthenticated, loading, redirectToLogin]);

  const getStatusColor = (status: number) => {
    switch(status) {
      case 1: return 'bg-green-100 text-green-800'; // Approved
      case 0: return 'bg-yellow-100 text-yellow-800'; // Pending
      case -1: return 'bg-red-100 text-red-800'; // Rejected
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: number) => {
    switch(status) {
      case 1: return 'Approved';
      case 0: return 'Pending';
      case -1: return 'Rejected';
      default: return 'Unknown';
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

  const formatAmount = (amount: string, symbol: string | null) => {
    const numAmount = parseFloat(amount);
    if (symbol) {
      return `${symbol}${numAmount.toFixed(2)}`;
    }
    return `৳${numAmount.toFixed(2)}`; // Default to Taka symbol for bkash
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Withdraw History</h1>
        <p className="text-white/80 mt-2">Track all your withdrawal activity in one place</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
          <span className="ml-4 text-lg text-gray-600">Verifying your account...</span>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
          <span className="ml-4 text-lg text-gray-600">Loading your withdraw history...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
      ) : withdrawHistory.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No withdraw history found</h3>
          <p className="mt-1 text-gray-500">You haven&apos;t made any withdrawals yet.</p>
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
                    Payment ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receiver Number
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
                {withdrawHistory.map((withdraw) => (
                  <tr key={withdraw.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{withdraw.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {withdraw.payment_id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {withdraw.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      {formatAmount(withdraw.amount, withdraw.symbol)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {withdraw.recever_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(withdraw.status)}`}>
                        {getStatusText(withdraw.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(withdraw.created_at)}
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