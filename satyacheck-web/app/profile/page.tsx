"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supbase/client";
import { useRouter } from "next/navigation";
import ProfileComponent from "@/components/ProfileComponet";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const { data: user, error: userError } = await supabase
        .from("user")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      } else {
        setUserData(user);
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ProfileComponent user={userData} />;
}
