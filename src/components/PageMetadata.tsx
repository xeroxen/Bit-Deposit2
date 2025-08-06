'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMetadata } from '@/lib/metadataContext';
import { metadataMap } from '@/lib/metadata';

interface PageMetadataProps {
  customTitle?: string;
  customDescription?: string;
}

export function PageMetadata({ customTitle, customDescription }: PageMetadataProps) {
  const pathname = usePathname();
  const { updateMetadata } = useMetadata();
  
  useEffect(() => {
    if (customTitle || customDescription) {
      // Use custom metadata if provided
      updateMetadata({
        title: customTitle || 'Raza20',
        description: customDescription || 'Your trusted platform for secure gaming and transactions',
      });
    } else {
      // Use default page metadata
      const pageMetadata = metadataMap[pathname];
      if (pageMetadata) {
        updateMetadata(pageMetadata);
      } else {
        // Default metadata for unknown pages
        updateMetadata({
          title: 'Raza20 - Your Trusted Gaming Platform',
          description: 'Your trusted platform for secure gaming and transactions.',
        });
      }
    }
  }, [pathname, customTitle, customDescription, updateMetadata]);
  
  return null; // This component doesn't render anything
}
