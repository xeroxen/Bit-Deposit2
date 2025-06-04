import React from 'react';
import Depositform from './depositForm';

export const metadata = {
    title: 'Deposit | MyBet24',
    description: 'Make a deposit to your MyBet24 account',
};

export default function DepositPage() {
    return (
        <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[80vh] mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Deposit Funds</h1>
            <div className="w-full max-w-md flex justify-center px-4 sm:px-0">
                <Depositform />
            </div>
        </div>
    );
}