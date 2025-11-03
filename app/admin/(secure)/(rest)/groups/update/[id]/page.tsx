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
  });

  if (!group) return;

  return (
    <div>
      <ClientForm group={group} />
    </div>
  );
}
