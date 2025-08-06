import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import BottomFooter from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { AuthProvider } from "@/lib/authContext";
import { WalletProvider } from "@/lib/walletContext";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GameProvider } from '@/lib/gameContext';
import BottomNavigation from "@/components/bottom-navbar/bottom-navbar";
import { MetadataProvider } from "@/lib/metadataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Bit-Deposit - Your Trusted Gaming Platform',
  description: 'Your trusted platform for secure gaming and transactions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader 
          color="#2299DD"
          initialPosition={0.08}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showSpinner={false}
        />
        <MetadataProvider>
          <AuthProvider>
            <WalletProvider>
              <GameProvider>
                <Navbar />
                {children}
                <div className="block md:hidden">
                  <BottomNavigation />
                </div>
                <BottomFooter />
                <Toaster />
                <SpeedInsights />
              </GameProvider>
            </WalletProvider>
          </AuthProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}
