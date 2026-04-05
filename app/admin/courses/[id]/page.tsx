import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courses";
import { CourseForm } from "@/components/Admin/CourseForm";
import { updateCourseAction } from "@/app/actions/admin/courses";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateCourseAction(id, formData);
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        講座を編集
      </h1>
      <CourseForm course={course} action={action} submitLabel="保存する" />
    </div>
  );
}
