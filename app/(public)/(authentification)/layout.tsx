import { ReactNode } from "react";
import { cookies } from "next/headers";
import { VerifyToken } from "@/auth";

import { redirect } from "next/navigation";

export default async function AuthentificationLayoutPublic({
  children,
}: {
  children: ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("token");

  if (token) {
    const validToken = await VerifyToken(token.value);
    if (validToken) {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-700">
      {children}
    </div>
  );
}
