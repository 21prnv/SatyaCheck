"use server";

import { createClient } from "@/utils/supbase/server";
import { revalidatePath } from "next/cache";

export async function createServer(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  if (!name || !image) {
    return { error: "Name and image are required" };
  }

  // Get current user information
  const {
    data: { user },
    error: userError,
  } = await (await supabase).auth.getUser();

  if (userError || !user) {
    return { error: "Failed to fetch user" };
  }

  const userId = user.id; // Get the current user's ID

  // Upload image to Supabase Storage
  const { data: uploadData, error: uploadError } = await (
    await supabase
  ).storage
    .from("server-dp")
    .upload(`${Date.now()}-${image.name}`, image);

  if (uploadError) {
    return { error: "Failed to upload image" };
  }

  // Get the public URL of the uploaded image
  const {
    data: { publicUrl },
  } = await (await supabase).storage
    .from("server-dp")
    .getPublicUrl(uploadData.path);

  // Insert new server into the database with current user as "Admin" in members array
  const { data, error } = await (
    await supabase
  )
    .from("servers")
    .insert([
      {
        name,
        dp_url: publicUrl,
        members: [{ [userId]: "Admin" }], // Add the current user as "Admin"
      },
    ])
    .select();

  if (error) {
    return { error: "Failed to create server" };
  }

  revalidatePath("/");
  return { success: true, server: data[0] };
}
