import { Suspense } from "react";
import SignupPageClient from "./SignupPageClient";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 mt-10 bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPageClient />
      </Suspense>
    </main>
  );
}
