import { GetUserIdToken, VerifyToken } from "@/auth";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { ReactNode } from "react";
import prisma from "@/lib/prisma";

export default async function AuthentificationLayoutAdmin({
  children,
}: {
  children: ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("token");

  if (token) {
    const validToken = await VerifyToken(token.value);
    if (validToken) {
      const userId = await GetUserIdToken(token.value);
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || !user.admin) {
        redirect("/");
      }

      redirect("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-700">
      {children}
    </div>
  );
}
