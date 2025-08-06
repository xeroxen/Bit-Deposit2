'use client';

import React, { createContext, useContext, useState, } from 'react';
import { Metadata } from 'next';

interface MetadataContextType {
  metadata: Metadata;
  updateMetadata: (newMetadata: Metadata) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export function MetadataProvider({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadata] = useState<Metadata>({
    title: 'Raza20',
    description: 'Your trusted platform for secure gaming and transactions',
  });

  const updateMetadata = (newMetadata: Metadata) => {
    setMetadata(newMetadata);
    
    // Update document title and meta tags
    if (newMetadata.title) {
      document.title = typeof newMetadata.title === 'string' 
        ? newMetadata.title 
        : 'Raza20';
    }
    
    if (newMetadata.description) {
      const description = typeof newMetadata.description === 'string' 
        ? newMetadata.description 
        : 'Your trusted platform for secure gaming and transactions';
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  };

  return (
    <MetadataContext.Provider value={{ metadata, updateMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
}
