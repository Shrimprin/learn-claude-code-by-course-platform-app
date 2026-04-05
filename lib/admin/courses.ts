import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/courses";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export async function getAdminCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createCourse(
  data: TablesInsert<"courses">
): Promise<Course> {
  const supabase = await createClient();
  const { data: course, error } = await supabase
    .from("courses")
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return course;
}

export async function updateCourse(
  id: string,
  data: TablesUpdate<"courses">
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").update(data).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteCourse(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
