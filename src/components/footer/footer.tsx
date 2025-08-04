"use client"
import Link from "next/link"
import { Facebook, Youtube } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Data } from "@/types/data.types";

interface SocialData {
  id: number;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  linkedin: string | null;
  created_at: string;
  updated_at: string;
}

export default function BottomFooter() {
  const [logo, setLogo] = useState<Data>();
  const [socialLinks, setSocialLinks] = useState<SocialData | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/data`);
      const data = await response.json();
      setLogo(data.setting);
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://new.fnd777.pro/api/social');
        const data = await response.json();
        if (data.status && data.social) {
          setSocialLinks(data.social);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {logo?.software_logo_white && (
              <Image src={`${process.env.NEXT_PUBLIC_API_URL}${logo.software_logo_white}`} alt="logo" width={200} height={40} />
            )}
          </div>
          <p className="text-gray-300 mb-4">Contact with us</p>

          {/* Social Media Icons */}
          <div className="flex gap-3 mb-4">
            {socialLinks?.facebook && (
              <Link
                href={`https://${socialLinks.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </Link>
            )}
            {socialLinks?.youtube && (
              <Link
                href={`https://${socialLinks.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Youtube className="w-5 h-5 text-red-600" />
              </Link>
            )}
            {socialLinks?.twitter && (
              <Link
                href={`https://${socialLinks.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">t</span>
                </div>
              </Link>
            )}
            {socialLinks?.linkedin && (
              <Link
                href={`https://${socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
              </Link>
            )}
            {socialLinks?.instagram && (
              <Link
                href={`https://${socialLinks.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs">🐦</span>
                </div>
              </Link>
            )}
            {socialLinks?.tiktok && (
              <Link
                href={`https://${socialLinks.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">@</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Quick & Easy Payment Methods We Support</h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {/* bKash */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="/images/bkash-logo.png" 
                  alt="bKash" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Nagad */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="/images/nagad-logo.png" 
                  alt="Nagad" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Rocket */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="/images/rocket-logo.png" 
                  alt="Rocket" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Upay */}
              {/* <div className="w-32 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-base font-bold">Upay</span>
              </div> */}
              
              {/* Tap */}
              {/* <div className="w-32 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-base font-bold">Tap</span>
              </div> */}
              
              {/* Sure Cash */}
              {/* <div className="w-32 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-base font-bold">Sure</span>
              </div> */}
              
              {/* Bank Transfer */}
              {/* <div className="w-32 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-base font-bold">Bank</span>
              </div> */}
              
              {/* Visa */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Mastercard */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* American Express */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png" 
                  alt="American Express" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* DBBL */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
              <Image 
                  src="https://www.dutchbanglabank.com/img/logo.png" 
                  alt="DBBL" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* City Bank */}
              <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden">
              <Image 
                  src="https://www.citybankplc.com/dist/img/logo/citylogo.png" 
                  alt="City Bank" 
                  width={96} 
                  height={48} 
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-right">
              <p>© 2025 All Rights Reserved Raza20.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
