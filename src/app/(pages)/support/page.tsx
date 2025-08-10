"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaTelegram, FaEnvelope } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageMetadata } from "@/components/PageMetadata";

export default function SupportPage() {
  const [contacts, setContacts] = useState({ wapp: null, tgram: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/data`);
        const data = await res.json();
        setContacts({
          wapp: data?.setting?.wapp || null,
          tgram: data?.setting?.tgram || null,
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts({ wapp: null, tgram: null });
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  // Fallbacks if API returns null or placeholder
  const whatsappNumber = contacts.wapp ? contacts.wapp : "1234567890";
  const telegramUser = contacts.tgram ? contacts.tgram : "bitdeposit";

  return (
    <>
    <PageMetadata />
    <div className="container mx-auto py-12 px-4 mt-25">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We&apos;re here to help! Our support team is available 24/7 to assist you with any questions or issues you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
        {/* <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary text-2xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                <path d="M15 5h4v4"></path>
                <path d="M16 4l4 4-4 4"></path>
              </svg>
            </div>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Connect with our support team instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Available 24/7 for all your queries. Our average response time is under 2 minutes.</p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card> */}

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="bg-[#25D366]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <FaWhatsapp className="text-[#25D366] text-2xl" />
            </div>
            <CardTitle>WhatsApp</CardTitle>
            <CardDescription>Chat with us on WhatsApp</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get quick responses to your questions through WhatsApp messaging.</p>
            <Button
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
              disabled={loading}
            >
              <FaWhatsapp className="mr-2" />
              {loading ? "Loading..." : "Connect on WhatsApp"}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="bg-[#0088cc]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <FaTelegram className="text-[#0088cc] text-2xl" />
            </div>
            <CardTitle>Telegram</CardTitle>
            <CardDescription>Reach us on Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Join our Telegram channel for support and updates about our services.</p>
            <Button
              className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90"
              onClick={() => window.open(`https://t.me/${telegramUser}`, "_blank")}
              disabled={loading}
            >
              <FaTelegram className="mr-2" />
              {loading ? "Loading..." : "Join on Telegram"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card border rounded-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Additional Contact Methods</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <FaEnvelope className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Email Support</h3>
              <p className="text-muted-foreground mb-2">Send us an email and we&apos;ll respond within 24 hours</p>
              <a href="mailto:raza20official@gmail.com" className="text-primary hover:underline">
              raza20official@gmail.com
              </a>
            </div>
          </div>
          
          {/* <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <FaPhone className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Phone Support</h3>
              <p className="text-muted-foreground mb-2">Call us directly for urgent matters</p>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
}
