import React from 'react';
import WithdrawForm from './withdrawForm';
export const metadata = {
    title: 'Withdraw ',
    description: 'Withdraw funds from your Fnd777 account',
};

export default function WithdrawPage() {
    return (
        <div className="container mx-auto py-10 flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold text-center mb-8">Withdraw Funds</h1>
            <div className="w-full max-w-md flex justify-center px-4 sm:px-0">
                <WithdrawForm />
            </div>
        </div>
    );
}