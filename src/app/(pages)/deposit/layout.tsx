import React from 'react';

export const metadata = {
  title: "Deposit | Fnd777",
  description: "Make a deposit to your Fnd777 account",
}

export default function DepositLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 