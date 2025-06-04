"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DepositSuccessPage() {
    return (
        <div className="max-w-md w-full mx-auto p-8 bg-card rounded-lg shadow-md text-center mt-20">
            <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">Withdraw Successful!</h1>
            <p className="text-muted-foreground mb-6">
                Your withdraw has been submitted successfully and is being processed.
                You will receive a confirmation shortly.
            </p>

            <div className="flex flex-col gap-3">
                <Button asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/deposit">Make Another Withdraw</Link>
                </Button>
            </div>
        </div>
    );
} 