"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function markVideoComplete(
  videoId: string,
  courseId: string
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      video_id: videoId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,video_id" }
  );

  revalidatePath(`/course/${courseId}`);
  revalidatePath(`/course/${courseId}/video/${videoId}`);
}
