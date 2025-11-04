import { StudentsTable, UsersTable, CoursesTable } from "@/components/tables";

export default async function AdminDashboard() {
  return (
    <div className="space-y-4">
      <UsersTable />
      <StudentsTable />
      <CoursesTable />
    </div>
  );
}
