"use client";

import { createClient } from "@/utils/supbase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ProfileComponent({ user }: { user: any }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-2 border-blue-500"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mt-6 border-t">
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{user.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
