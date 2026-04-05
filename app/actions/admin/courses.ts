"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCourse, updateCourse, deleteCourse } from "@/lib/admin/courses";
import { requireAdmin } from "@/lib/admin/auth";

export async function createCourseAction(formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const thumbnail_url = formData.get("thumbnail_url") as string;

  if (!title?.trim()) throw new Error("タイトルは必須です");

  await createCourse({
    title: title.trim(),
    description: description?.trim() || null,
    thumbnail_url: thumbnail_url?.trim() || null,
  });

  revalidatePath("/admin/courses");
  revalidatePath("/");
  redirect("/admin/courses");
}

export async function updateCourseAction(id: string, formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const thumbnail_url = formData.get("thumbnail_url") as string;

  if (!title?.trim()) throw new Error("タイトルは必須です");

  await updateCourse(id, {
    title: title.trim(),
    description: description?.trim() || null,
    thumbnail_url: thumbnail_url?.trim() || null,
  });

  revalidatePath("/admin/courses");
  revalidatePath("/");
  redirect("/admin/courses");
}

export async function deleteCourseAction(id: string) {
  await requireAdmin();
  await deleteCourse(id);
  revalidatePath("/admin/courses");
  revalidatePath("/");
}
