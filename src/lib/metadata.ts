// app/lib/metadata.ts
import { Metadata } from 'next';

type MetadataMap = Record<string, Metadata>;

export const metadataMap: MetadataMap = {
  '/': {
    title: 'Raza20 - Your Trusted Gaming Platform',
    description: 'Welcome to Raza20, your trusted platform for secure gaming and transactions. Enjoy casino games, sports betting, and more.',
  },
  '/casino': {
    title: 'Casino Games - Raza20',
    description: 'Explore our extensive collection of casino games including slots, table games, and live dealer games. Play with confidence on Raza20.',
  },
  '/sports': {
    title: 'Sports Betting - Raza20',
    description: 'Place bets on your favorite sports teams and events. Get the best odds and live betting options on Raza20.',
  },
  '/gaming': {
    title: 'Gaming - Raza20',
    description: 'Discover exciting gaming options and entertainment. Join Raza20 for the ultimate gaming experience.',
  },
  '/deposit': {
    title: 'Deposit Funds - Raza20',
    description: 'Securely deposit funds to your Raza20 account. Multiple payment methods available for your convenience.',
  },
  '/deposit-history': {
    title: 'Deposit History - Raza20',
    description: 'View your complete deposit history and transaction details on Raza20.',
  },
  '/withdraw': {
    title: 'Withdraw Funds - Raza20',
    description: 'Withdraw your winnings securely from your Raza20 account. Fast and reliable withdrawal process.',
  },
  '/withdraw-history': {
    title: 'Withdraw History - Raza20',
    description: 'Track your withdrawal history and transaction status on Raza20.',
  },
  '/profile': {
    title: 'My Profile - Raza20',
    description: 'Manage your Raza20 profile, view account details, and update your information.',
  },
  '/favourites': {
    title: 'My Favourites - Raza20',
    description: 'Access your favorite games and bookmarked content on Raza20.',
  },
  '/transaction-history': {
    title: 'Transaction History - Raza20',
    description: 'View your complete transaction history including deposits, withdrawals, and betting activities.',
  },
  '/search': {
    title: 'Search Games - Raza20',
    description: 'Search and discover games, sports events, and more on Raza20.',
  },
  '/support': {
    title: 'Customer Support - Raza20',
    description: 'Get help and support from our customer service team. We\'re here to assist you 24/7.',
  },
  '/login': {
    title: 'Login - Raza20',
    description: 'Sign in to your Raza20 account to access games, make deposits, and manage your profile.',
  },
  '/signup': {
    title: 'Sign Up - Raza20',
    description: 'Create your Raza20 account today and start enjoying secure gaming and betting.',
  },
  '/forgot-password': {
    title: 'Forgot Password - Raza20',
    description: 'Reset your Raza20 account password securely and quickly.',
  },
  '/reset-password': {
    title: 'Reset Password - Raza20',
    description: 'Set a new password for your Raza20 account.',
  },
  '/old-sports': {
    title: 'Sports Betting - Raza20',
    description: 'Place bets on traditional sports events with competitive odds on Raza20.',
  },
};

export function getMetadata(pathname: string): Metadata {
  return metadataMap[pathname] || {
    title: 'Raza20 - Your Trusted Gaming Platform',
    description: 'Your trusted platform for secure gaming and transactions.',
  };
}