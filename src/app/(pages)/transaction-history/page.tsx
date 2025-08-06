'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/authContext';
import { apiRequest } from '@/lib/authentication';
import { Transaction, TransactionHistoryResponse } from '@/types/data.types';
import { ArrowUpRight, ArrowDownRight, Gift, RefreshCw, AlertCircle } from 'lucide-react';
import { PageMetadata } from '@/components/PageMetadata';

const TransactionHistoryPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { isAuthenticated, redirectToLogin } = useAuth();

    const fetchTransactions = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            }
            
            const response = await apiRequest<TransactionHistoryResponse>('/activity-for-user');
            setTransactions(response.activity);
            setError(null);
        } catch (err: unknown) {
            console.error('Error fetching transactions:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transaction history';
            setError(errorMessage);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            redirectToLogin();
            return;
        }
        
        fetchTransactions();
    }, [isAuthenticated, redirectToLogin]);

    const handleRefresh = () => {
        fetchTransactions(true);
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'deposit':
                return <ArrowDownRight className="w-4 h-4 text-green-500" />;
            case 'withdrawal':
                return <ArrowUpRight className="w-4 h-4 text-red-500" />;
            case 'bonus':
                return <Gift className="w-4 h-4 text-blue-500" />;
            default:
                return <ArrowUpRight className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTransactionBadgeVariant = (type: string) => {
        switch (type) {
            case 'deposit':
                return 'default';
            case 'withdrawal':
                return 'destructive';
            case 'bonus':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const extractAmount = (text: string) => {
        const match = text.match(/(\d+\.?\d*)\s*TK/);
        return match ? match[1] : null;
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
        <PageMetadata />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 mt-25">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Transaction History
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                View all your account activities and transactions
                            </p>
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <div>
                                    <p className="text-red-700 dark:text-red-400 font-medium">
                                        Error loading transactions
                                    </p>
                                    <p className="text-red-600 dark:text-red-300 text-sm">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Loading State */}
                {loading && !refreshing && (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                                            </div>
                                        </div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Transactions List */}
                {!loading && transactions.length === 0 && !error && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ArrowUpRight className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No transactions found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    You haven&apos;t made any transactions yet.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Transactions */}
                {!loading && transactions.length > 0 && (
                    <div className="space-y-4">
                        {transactions.map((transaction) => {
                            const amount = extractAmount(transaction.text);
                            return (
                                <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                                    {getTransactionIcon(transaction.type)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Badge variant={getTransactionBadgeVariant(transaction.type)}>
                                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                                        </Badge>
                                                        {amount && (
                                                            <span className={`font-semibold ${
                                                                transaction.type === 'deposit' || transaction.type === 'bonus' 
                                                                    ? 'text-green-600 dark:text-green-400' 
                                                                    : 'text-red-600 dark:text-red-400'
                                                            }`}>
                                                                {transaction.type === 'withdrawal' ? '-' : '+'}{amount} TK
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                                        {transaction.text}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                        ID: {transaction.transaction}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {formatDate(transaction.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Transaction Count */}
                {!loading && transactions.length > 0 && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default TransactionHistoryPage;