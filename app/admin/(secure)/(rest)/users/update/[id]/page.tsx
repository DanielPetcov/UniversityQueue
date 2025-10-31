import prisma from "@/lib/prisma";
import { ClientForm } from "./client-form";

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });

  if (!user) return;

  return (
    <div>
      <ClientForm user={user} />
    </div>
  );
}
