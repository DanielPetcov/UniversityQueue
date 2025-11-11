"use server";

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VerifyValidateToken, VerifyRoleUserSuperAdmin } from "@/auth";

export async function SessionWrapperSuperAdmin({
  children,
}: {
  children: ReactNode;
}) {
  const siteCookies = await cookies();
  const token = siteCookies.get("token");

  if (!token) {
    redirect("/super-admin/sign-in");
  }

  await VerifyValidateToken(token, "/admin/sign-in");

  const valid = await VerifyRoleUserSuperAdmin(token);

  if (!valid) {
    redirect("/super-admin/sign-in");
  }

  return <>{children}</>;
}
