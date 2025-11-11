"use server";

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VerifyValidateToken, VerifyRoleUserStudent } from "@/auth";

export async function SessionWrapperStudent({
  children,
}: {
  children: ReactNode;
}) {
  const siteCookies = await cookies();
  const token = siteCookies.get("token");

  if (!token) {
    redirect("/sign-in");
  }

  await VerifyValidateToken(token, "/sign-in");

  const valid = await VerifyRoleUserStudent(token);
  if (!valid) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
