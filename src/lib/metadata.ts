// app/lib/metadata.ts
import { Metadata } from 'next';

type MetadataMap = Record<string, Metadata>;

export const metadataMap: MetadataMap = {
  '/': {
    title: 'Bit-Deposit - Your Trusted Gaming Platform',
    description: 'Welcome to Bit-Deposit, your trusted platform for secure gaming and transactions. Enjoy casino games, sports betting, and more.',
  },
  '/casino': {
    title: 'Casino Games - Bit-Deposit',
    description: 'Explore our extensive collection of casino games including slots, table games, and live dealer games. Play with confidence on Bit-Deposit.',
  },
  '/sports': {
    title: 'Sports Betting - Bit-Deposit',
    description: 'Place bets on your favorite sports teams and events. Get the best odds and live betting options on Bit-Deposit.',
  },
  '/gaming': {
    title: 'Gaming - Bit-Deposit',
    description: 'Discover exciting gaming options and entertainment. Join Bit-Deposit for the ultimate gaming experience.',
  },
  '/deposit': {
    title: 'Deposit Funds - Bit-Deposit',
    description: 'Securely deposit funds to your Bit-Deposit account. Multiple payment methods available for your convenience.',
  },
  '/deposit-history': {
    title: 'Deposit History - Bit-Deposit',
    description: 'View your complete deposit history and transaction details on Bit-Deposit.',
  },
  '/withdraw': {
    title: 'Withdraw Funds - Bit-Deposit',
    description: 'Withdraw your winnings securely from your Bit-Deposit account. Fast and reliable withdrawal process.',
  },
  '/withdraw-history': {
    title: 'Withdraw History - Bit-Deposit',
    description: 'Track your withdrawal history and transaction status on Bit-Deposit.',
  },
  '/profile': {
    title: 'My Profile - Bit-Deposit',
    description: 'Manage your Bit-Deposit profile, view account details, and update your information.',
  },
  '/favourites': {
    title: 'My Favourites - Bit-Deposit',
    description: 'Access your favorite games and bookmarked content on Bit-Deposit.',
  },
  '/transaction-history': {
    title: 'Transaction History - Bit-Deposit',
    description: 'View your complete transaction history including deposits, withdrawals, and betting activities.',
  },
  '/search': {
    title: 'Search Games - Bit-Deposit',
    description: 'Search and discover games, sports events, and more on Bit-Deposit.',
  },
  '/support': {
    title: 'Customer Support - Bit-Deposit',
    description: 'Get help and support from our customer service team. We\'re here to assist you 24/7.',
  },
  '/login': {
    title: 'Login - Bit-Deposit',
    description: 'Sign in to your Bit-Deposit account to access games, make deposits, and manage your profile.',
  },
  '/signup': {
    title: 'Sign Up - Bit-Deposit',
    description: 'Create your Bit-Deposit account today and start enjoying secure gaming and betting.',
  },
  '/forgot-password': {
    title: 'Forgot Password - Bit-Deposit',
    description: 'Reset your Bit-Deposit account password securely and quickly.',
  },
  '/reset-password': {
    title: 'Reset Password - Bit-Deposit',
    description: 'Set a new password for your Bit-Deposit account.',
  },
  '/old-sports': {
    title: 'Sports Betting - Bit-Deposit',
    description: 'Place bets on traditional sports events with competitive odds on Bit-Deposit.',
  },
};

export function getMetadata(pathname: string): Metadata {
  return metadataMap[pathname] || {
    title: 'Bit-Deposit - Your Trusted Gaming Platform',
    description: 'Your trusted platform for secure gaming and transactions.',
  };
}