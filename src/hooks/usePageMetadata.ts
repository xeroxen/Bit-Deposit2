'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMetadata } from '@/lib/metadataContext';
import { metadataMap } from '@/lib/metadata';

export function usePageMetadata() {
  const pathname = usePathname();
  const { updateMetadata } = useMetadata();

  useEffect(() => {
    const pageMetadata = metadataMap[pathname];
    if (pageMetadata) {
      updateMetadata(pageMetadata);
    } else {
      // Default metadata for unknown pages
      updateMetadata({
        title: 'Bit-Deposit',
        description: 'Your trusted platform for secure gaming and transactions',
      });
    }
  }, [pathname, updateMetadata]);
}
