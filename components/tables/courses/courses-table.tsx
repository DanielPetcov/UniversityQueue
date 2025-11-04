import prisma from "@/lib/prisma";
import { DataTable } from "../data-table";
import { coursesColumns } from "./columns";
export async function CoursesTable() {
  const courses = await prisma.course.findMany();

  return (
    <>
      <div className="space-y-2 bg-white p-4 rounded-md">
        <h3>Courses</h3>
        <DataTable columns={coursesColumns} data={courses} />
      </div>
    </>
  );
}
