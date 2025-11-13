"use server";

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VerifyValidateToken, VerifyRoleUserAdmin } from "@/auth";

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

  await VerifyValidateToken(token, "/admin/sign-in");

  const valid = await VerifyRoleUserAdmin(token);

  if (!valid) {
    redirect("/admin/sign-in");
  }

  console.log("everything is ok", token);

  return <>{children}</>;
}
