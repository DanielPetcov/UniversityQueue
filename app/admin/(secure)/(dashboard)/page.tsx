import {
  StudentsTable,
  UsersTable,
  CoursesTable,
  GroupsTable,
} from "@/components/tables";

export default async function AdminDashboard() {
  return (
    <div className="space-y-4">
      <UsersTable />
      <StudentsTable />
      <CoursesTable />
      <GroupsTable />
    </div>
  );
}
