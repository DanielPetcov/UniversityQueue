import prisma from "@/lib/prisma";
import { ClientForm } from "./client-form";

export default async function UpdateCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) return;

  return (
    <div>
      <ClientForm course={course} />
    </div>
  );
}
