import { CoursesTable, StudentsTable } from "@/components/tables";

export default async function AdminDashboard() {
  return (
    <div className="space-y-4">
      <StudentsTable className="max-w-md" />
      <CoursesTable className="max-w-md" />
    </div>
  );
}
