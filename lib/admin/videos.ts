import { createClient } from "@/lib/supabase/server";
import type { Video } from "@/lib/videos";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export async function getAdminVideos(sectionId: string): Promise<Video[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("section_id", sectionId)
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getNextVideoOrderIndex(sectionId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("order_index")
    .eq("section_id", sectionId)
    .order("order_index", { ascending: false })
    .limit(1)
    .single();
  return (data?.order_index ?? -1) + 1;
}

export async function createVideo(
  sectionId: string,
  data: Omit<TablesInsert<"videos">, "section_id">
): Promise<Video> {
  const supabase = await createClient();
  const { data: video, error } = await supabase
    .from("videos")
    .insert({ ...data, section_id: sectionId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return video;
}

export async function updateVideo(
  id: string,
  data: TablesUpdate<"videos">
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").update(data).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteVideo(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function reorderVideos(
  orderedIds: { id: string; order_index: number }[]
): Promise<void> {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map(({ id, order_index }) =>
      supabase.from("videos").update({ order_index }).eq("id", id)
    )
  );
}
