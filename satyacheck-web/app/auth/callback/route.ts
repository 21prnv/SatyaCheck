import { createClient } from "@/utils/supbase/server";
import { storeUserData } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export async function GET(request: any) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    console.log("Something is happening");
    // Exchange code for session
    const { data, error } = await (
      await supabase
    ).auth.exchangeCodeForSession(code);

    if (!error && data?.session?.user) {
      // Store user data in your users table
      console.log(data.session.user);

      await storeUserData(data.session.user);
    }
  }

  // Redirect to the home page or dashboard
  redirect("/");
}
