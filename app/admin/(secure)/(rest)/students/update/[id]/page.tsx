import prisma from "@/lib/prisma";
import { ClientForm } from "./client-form";

export default async function UpdateStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });

  if (!student) return;

  return (
    <div>
      <ClientForm student={student} />
    </div>
  );
}
