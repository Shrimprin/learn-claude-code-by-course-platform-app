import { CourseForm } from "@/components/Admin/CourseForm";
import { createCourseAction } from "@/app/actions/admin/courses";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        新規講座作成
      </h1>
      <CourseForm action={createCourseAction} submitLabel="作成する" />
    </div>
  );
}
