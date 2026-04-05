"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  reorderVideos,
  getNextVideoOrderIndex,
} from "@/lib/admin/videos";
import { extractYouTubeId } from "@/lib/youtube";

function validateYouTubeUrl(url: string): void {
  if (!extractYouTubeId(url)) {
    throw new Error(
      "YouTube URL の形式が正しくありません（youtube.com/watch?v= または youtu.be/ 形式で入力してください）"
    );
  }
}

export async function createVideoAction(
  sectionId: string,
  courseId: string,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const youtube_url = formData.get("youtube_url") as string;
  const durationStr = formData.get("duration") as string;
  const is_free = formData.get("is_free") === "on";

  if (!title?.trim()) throw new Error("タイトルは必須です");
  if (!youtube_url?.trim()) throw new Error("YouTube URL は必須です");
  validateYouTubeUrl(youtube_url.trim());

  const order_index = await getNextVideoOrderIndex(sectionId);
  await createVideo(sectionId, {
    title: title.trim(),
    youtube_url: youtube_url.trim(),
    duration: durationStr ? parseInt(durationStr, 10) : null,
    is_free,
    order_index,
  });

  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/videos`);
  revalidatePath(`/course/${courseId}`);
}

export async function updateVideoAction(
  id: string,
  sectionId: string,
  courseId: string,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const youtube_url = formData.get("youtube_url") as string;
  const durationStr = formData.get("duration") as string;
  const is_free = formData.get("is_free") === "on";

  if (!title?.trim()) throw new Error("タイトルは必須です");
  if (!youtube_url?.trim()) throw new Error("YouTube URL は必須です");
  validateYouTubeUrl(youtube_url.trim());

  await updateVideo(id, {
    title: title.trim(),
    youtube_url: youtube_url.trim(),
    duration: durationStr ? parseInt(durationStr, 10) : null,
    is_free,
  });

  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/videos`);
  revalidatePath(`/course/${courseId}`);
  redirect(`/admin/courses/${courseId}/sections/${sectionId}/videos`);
}

export async function deleteVideoAction(
  id: string,
  sectionId: string,
  courseId: string
) {
  await deleteVideo(id);
  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/videos`);
  revalidatePath(`/course/${courseId}`);
}

export async function reorderVideosAction(
  sectionId: string,
  courseId: string,
  orderedIds: { id: string; order_index: number }[]
) {
  await reorderVideos(orderedIds);
  revalidatePath(`/admin/courses/${courseId}/sections/${sectionId}/videos`);
  revalidatePath(`/course/${courseId}`);
}
