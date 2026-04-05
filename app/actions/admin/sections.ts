"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
  getNextSectionOrderIndex,
} from "@/lib/admin/sections";
import { requireAdmin } from "@/lib/admin/auth";

export async function createSectionAction(courseId: string, formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  if (!title?.trim()) throw new Error("タイトルは必須です");

  const order_index = await getNextSectionOrderIndex(courseId);
  await createSection(courseId, { title: title.trim(), order_index });

  revalidatePath(`/admin/courses/${courseId}/sections`);
  revalidatePath(`/course/${courseId}`);
}

export async function updateSectionAction(
  id: string,
  courseId: string,
  formData: FormData
) {
  await requireAdmin();
  const title = formData.get("title") as string;
  if (!title?.trim()) throw new Error("タイトルは必須です");

  await updateSection(id, { title: title.trim() });
  revalidatePath(`/admin/courses/${courseId}/sections`);
  revalidatePath(`/course/${courseId}`);
  redirect(`/admin/courses/${courseId}/sections`);
}

export async function deleteSectionAction(id: string, courseId: string) {
  await requireAdmin();
  await deleteSection(id);
  revalidatePath(`/admin/courses/${courseId}/sections`);
  revalidatePath(`/course/${courseId}`);
}

export async function reorderSectionsAction(
  courseId: string,
  orderedIds: { id: string; order_index: number }[]
) {
  await requireAdmin();
  await reorderSections(orderedIds);
  revalidatePath(`/admin/courses/${courseId}/sections`);
  revalidatePath(`/course/${courseId}`);
}
