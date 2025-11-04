import prisma from "@/lib/prisma";
import { DataTable } from "../data-table";
import { groupsColumns } from "./columns";
export async function CoursesTable() {
  const groups = await prisma.group.findMany({
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return (
    <>
      <div className="space-y-2 bg-white p-4 rounded-md">
        <h3>Groups</h3>
        <DataTable columns={groupsColumns} data={groups} />
      </div>
    </>
  );
}
