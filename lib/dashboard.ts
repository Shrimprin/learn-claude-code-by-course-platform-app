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

  // 全コースの動画数を1クエリで取得
  const courseIds = Array.from(courseMap.keys());
  const { data: sectionsData } = await supabase
    .from("sections")
    .select("course_id, videos(id)")
    .in("course_id", courseIds);

  const totalVideosMap = new Map<string, number>();
  for (const section of sectionsData ?? []) {
    const courseId = section.course_id as string;
    const videoCount = (section.videos as { id: string }[]).length;
    totalVideosMap.set(courseId, (totalVideosMap.get(courseId) ?? 0) + videoCount);
  }

  const results: EnrolledCourse[] = [];
  for (const [courseId, entry] of courseMap) {
    const totalVideos = totalVideosMap.get(courseId) ?? 0;
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
