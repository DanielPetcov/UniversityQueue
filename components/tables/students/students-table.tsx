import prisma from "@/lib/prisma";
import { DataTable } from "../data-table";
import { studentsColumns } from "./columns";
export async function StudentsTable() {
  const students = await prisma.student.findMany({
    include: {
      user: { select: { name: true } },
      group: { select: { name: true } },
    },
  });

  return (
    <>
      <div className="space-y-2 bg-white p-4 rounded-md">
        <h3>Students</h3>
        <DataTable columns={studentsColumns} data={students} />
      </div>
    </>
  );
}
