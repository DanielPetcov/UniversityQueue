"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { VerifyToken } from "@/auth";
import { deleteCookie } from "@/actions";
import { ReactNode } from "react";

export async function SessionWrapper({ children }: { children: ReactNode }) {
  const siteCookies = await cookies();
  const token = siteCookies.get("token");

  if (!token) {
    redirect("/sign-in");
  }

  const validToken = VerifyToken(token.value);
  if (!validToken) {
    try {
      await deleteCookie("token");
    } catch {
      console.log("A network error occured");
    } finally {
      redirect("/sign-in");
    }
  }

  return <>{children}</>;
}
