import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/courses";
import { calcProgress } from "@/lib/progress";

export type EnrolledCourse = Course & {
  totalVideos: number;
  completedCount: number;
  progressPercent: number;
  lastVideoId: string | null;
};

export async function getUserEnrolledCourses(
  userId: string
): Promise<EnrolledCourse[]> {
  const supabase = await createClient();

  // 視聴済み動画から関連する講座情報をまとめて取得
  const { data: progressData } = await supabase
    .from("user_progress")
    .select("video_id, completed, completed_at, videos(section_id, sections(course_id, courses(*)))")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (!progressData || progressData.length === 0) return [];

  // コースごとに集計
  const courseMap = new Map<
    string,
    { course: Course; viewedVideoIds: Set<string>; completedVideoIds: Set<string>; lastVideoId: string | null }
  >();

  for (const p of progressData) {
    const video = p.videos as any;
    const section = video?.sections as any;
    const course = section?.courses as Course;
    if (!course) continue;

    const courseId = course.id;
    if (!courseMap.has(courseId)) {
      courseMap.set(courseId, {
        course,
        viewedVideoIds: new Set(),
        completedVideoIds: new Set(),
        lastVideoId: null,
      });
    }
    const entry = courseMap.get(courseId)!;
    entry.viewedVideoIds.add(p.video_id!);
    if (p.completed) entry.completedVideoIds.add(p.video_id!);
    if (!entry.lastVideoId) entry.lastVideoId = p.video_id!;
  }

  // 各コースの全動画数を取得して進捗率を算出
  const results: EnrolledCourse[] = [];
  for (const [courseId, entry] of courseMap) {
    const { count } = await supabase
      .from("videos")
      .select("id", { count: "exact", head: true })
      .eq("section_id", supabase.from("sections").select("id").eq("course_id", courseId) as unknown as string);

    // 簡易集計: sections → videos の件数
    const { data: videos } = await supabase
      .from("sections")
      .select("videos(id)")
      .eq("course_id", courseId);

    const totalVideos = (videos ?? []).flatMap((s: any) => s.videos).length;
    const completedCount = entry.completedVideoIds.size;

    results.push({
      ...entry.course,
      totalVideos,
      completedCount,
      progressPercent: calcProgress(totalVideos, completedCount),
      lastVideoId: entry.lastVideoId,
    });
  }

  return results;
}
