import prisma from "@/lib/prisma";
import { ClientForm } from "./client-form";
export default async function UpdateGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const group = await prisma.group.findUnique({
    where: {
      id,
    },
    include: {
      students: true,
    },
  });

  if (!group) return;

  const students = await prisma.student.findMany({
    where: {
      groupId: null,
    },
  });

  return (
    <div>
      <ClientForm group={group} students={students} />
    </div>
  );
}
