// app/auth/error/page.js
"use client";

import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600">
          {error === "AccessDenied"
            ? "Access was denied. Please try again."
            : "An error occurred during authentication."}
        </p>
      </div>
    </div>
  );
}
