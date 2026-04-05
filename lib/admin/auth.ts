import { createClient } from "@/lib/supabase/server";

/**
 * Server Actionの先頭で呼び出す管理者認証チェック。
 * 未認証またはadminロール以外の場合はエラーをスローする。
 */
export async function requireAdmin(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Forbidden");
}
