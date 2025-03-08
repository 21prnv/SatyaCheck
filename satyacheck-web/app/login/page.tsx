"use client";

import { signInWithGoogle } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to SatyaCheck
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to join the discussion
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Button
            onClick={() => signInWithGoogle()}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
