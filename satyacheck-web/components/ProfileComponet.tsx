"use client";

import { createClient } from "@/utils/supbase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ProfileComponent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("profile");
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
              className="rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-2 border-primary bg-primary flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mt-6 border-t">
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded ${
                activeTab === "profile"
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded ${
                activeTab === "saved" ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              Saved News
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "profile" ? (
              <div className="space-y-4">
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
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <SavedNews userId={user.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedNews({ userId }: { userId: string }) {
  const [savedNews, setSavedNews] = useState([]);

  // Implement fetching saved news from your database
  // You'll need to create a new table for saved news in Supabase
  // and fetch it here

  return (
    <div className="space-y-4">
      {savedNews.length === 0 ? (
        <p>No saved news articles yet.</p>
      ) : (
        savedNews.map((news: any) => (
          <div key={news.id} className="border p-4 rounded">
            {/* Display saved news content */}
          </div>
        ))
      )}
    </div>
  );
}
