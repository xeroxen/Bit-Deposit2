"use client"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Data } from "@/types/data.types";
import { FaTiktok } from "react-icons/fa"

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
  const [isDownloading, setIsDownloading] = useState(false);

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social`);
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

  const handleDownloadApp = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API_URL}/api/download-apk`;
    link.download = 'Raza20.apk';
    // link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {logo?.software_logo_white && (
              <Image src={`${process.env.NEXT_PUBLIC_API_URL}${logo.software_logo_white}`} alt="logo" width={80} height={24} />
            )}
          </div>
          <p className="text-gray-300 mb-4">Contact with us</p>

                     {/* Social Media Icons */}
           <div className="flex gap-0 mb-4">
             {socialLinks?.facebook && (
               <Link
                 href={`https://${socialLinks.facebook}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                 <Facebook className="w-8 h-8 text-white" />
               </Link>
             )}
             {socialLinks?.youtube && (
               <Link
                 href={`https://${socialLinks.youtube}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                 <Youtube className="w-8 h-8 text-white" />
               </Link>
             )}
             {socialLinks?.twitter && (
               <Link
                 href={`https://${socialLinks.twitter}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8 h-8" fill="white"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>
                 
               </Link>
             )}
             {socialLinks?.linkedin && (
               <Link
                 href={`https://${socialLinks.linkedin}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                   <Linkedin className="w-8 h-8 text-white" />
                 
               </Link>
             )}
             {socialLinks?.instagram && (
               <Link
                 href={`https://${socialLinks.instagram}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                   <Instagram className="w-8 h-8 text-white" />
                 
               </Link>
             )}
             {socialLinks?.tiktok && (
               <Link
                 href={`https://${socialLinks.tiktok}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
               >
                   <FaTiktok className="w-8 h-8 text-white" />
                 
               </Link>
             )}
           </div>
        </div>
        <div>
          {/* Google Play Store Badge */}

          <Image 
                 src="/google-play-badge.svg" 
                 alt="Get it on Google Play" 
                 width={120} 
                 height={36} 
                 className="h-9 w-auto cursor-pointer my-4"
                 onClick={handleDownloadApp}
               />
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Quick & Easy Payment Methods We Support</h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-6 gap-4">
              {/* bKash */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/bkash-logo.png" 
                  alt="bKash" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Nagad */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/nagad-logo.png" 
                  alt="Nagad" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Rocket */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/rocket-logo.png" 
                  alt="Rocket" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Upay */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
              <Image 
                  src="https://www.upaybd.com/images/Upay-logo-revised-new.png" 
                  alt="Upay" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Tap */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
              <Image 
                  src="https://cdn.prod.website-files.com/5ae897b18423ad8b62ceba7c/5b3a97163c43bae706308fca_logo_horz_mint_bg%402x.avif" 
                  alt="Tap" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Sure Cash */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
              <Image 
                  src="https://play-lh.googleusercontent.com/7P3DsQan_NHSE3PwEM9PwqVgdpqI-HsXwhJx-vwx2hjrUzy882Q7z3HVR2cL96IR2g=w240-h480-rw" 
                  alt="Sure Cash" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Bank Transfer */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center">
              <Image 
                  src="https://www.bankasia-bd.com/style/images/bank_asia_logo-2.png" 
                  alt="Bank Transfer" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Visa */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                  alt="Visa" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Mastercard */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png" 
                  alt="Mastercard" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* American Express */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png" 
                  alt="American Express" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* DBBL */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://www.dutchbanglabank.com/img/logo.png" 
                  alt="DBBL" 
                  width={80} 
                  height={40} 
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* City Bank */}
              <div className="w-16 h-10 md:w-20 md:h-12 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://www.citybankplc.com/dist/img/logo/citylogo.png" 
                  alt="City Bank" 
                  width={80} 
                  height={40} 
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
