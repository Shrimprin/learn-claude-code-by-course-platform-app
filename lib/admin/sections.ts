import { createClient } from "@/lib/supabase/server";
import type { Section } from "@/lib/sections";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export async function getAdminSections(courseId: string): Promise<Section[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getNextSectionOrderIndex(courseId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sections")
    .select("order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: false })
    .limit(1)
    .single();
  return (data?.order_index ?? -1) + 1;
}

export async function createSection(
  courseId: string,
  data: Omit<TablesInsert<"sections">, "course_id">
): Promise<Section> {
  const supabase = await createClient();
  const { data: section, error } = await supabase
    .from("sections")
    .insert({ ...data, course_id: courseId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return section;
}

export async function updateSection(
  id: string,
  data: TablesUpdate<"sections">
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("sections").update(data).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteSection(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("sections").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function reorderSections(
  orderedIds: { id: string; order_index: number }[]
): Promise<void> {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map(({ id, order_index }) =>
      supabase.from("sections").update({ order_index }).eq("id", id)
    )
  );
}
