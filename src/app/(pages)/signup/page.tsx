"use client"

import { Suspense } from "react";
import SignupPageClient from "./SignupPageClient";
import { PageMetadata } from "@/components/PageMetadata";

export default function SignupPage() {
  return (
    <>
      <PageMetadata />
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPageClient />
      </Suspense>
    </>
  );
}
