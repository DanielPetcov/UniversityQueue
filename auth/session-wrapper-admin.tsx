"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { deleteCookie } from "@/actions";
import { GetUserIdToken, VerifyToken } from "@/auth";
import { ReactNode } from "react";

export async function SessionWrapperAdmin({
  children,
}: {
  children: ReactNode;
}) {
  const siteCookies = await cookies();
  const token = siteCookies.get("token");

  if (!token) {
    redirect("/admin/sign-in");
  }

  const validToken = VerifyToken(token.value);
  if (!validToken) {
    try {
      await deleteCookie("token");
    } catch {
      console.log("A network error occured");
    } finally {
      redirect("/admin/sign-in");
    }
  }

  const userId = await GetUserIdToken(token.value);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.admin) {
    redirect("/");
  }

  return <>{children}</>;
}
