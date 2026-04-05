import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database";

export type Video = Tables<"videos">;

export async function getVideoById(videoId: string): Promise<Video | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("*")
    .eq("id", videoId)
    .single();
  return data;
}

/** コース内の全動画をセクション順・動画順で取得 */
export async function getVideosByCourseId(courseId: string): Promise<Video[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sections")
    .select("videos(*)")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })
    .order("order_index", { ascending: true, referencedTable: "videos" });

  if (!data) return [];
  return data.flatMap((s) => (s.videos as Video[]) ?? []);
}

/** YouTube URL から動画 ID を抽出 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/,
    /youtube\.com\/embed\/([^&\s?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
