"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "../utils/supbase/client";
import { LogIn } from "lucide-react";
import { signInWithGoogle } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("user")
          .select("*")
          .eq("id", user.id)
          .single();
        setUser(data);
      }
    };
    getUser();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  if (user) {
    return (
      <Button
        variant="ghost"
        onClick={() => router.push("/profile")}
        className="flex items-center gap-2 hover:bg-blue-50"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="hidden md:block">{user.name}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-3"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span className="font-medium">
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </span>
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-gray-500 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </Button>
  );
}
