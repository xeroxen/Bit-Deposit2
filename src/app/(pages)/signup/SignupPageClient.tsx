"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { useSearchParams } from "next/navigation";

export default function SignupPageClient() {
  const searchParams = useSearchParams();
  const referer = searchParams.get("referer") || "";
  return <SignupForm referer={referer} />;
} 