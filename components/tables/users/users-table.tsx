import prisma from "@/lib/prisma";
import { DataTable } from "../data-table";
import { usersColumns } from "./columns";

export async function UsersTable() {
  const users = await prisma.user.findMany({
    include: {
      student: {
        select: {
          id: true,
        },
      },
    },
    omit: {
      password: true,
    },
  });

  return (
    <>
      <div className="space-y-2 bg-white p-4 rounded-md">
        <h3>Users</h3>
        <DataTable columns={usersColumns} data={users} />
      </div>
    </>
  );
}
