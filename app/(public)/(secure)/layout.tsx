import { ReactNode } from "react";

import { GetUserIdToken, SessionWrapper } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PublicSidebar from "./components/public-sidebar";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) {
    redirect("/sign-in");
  }
  const userId = await GetUserIdToken(token.value);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
      admin: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <SessionWrapper>
      <SidebarProvider>
        <PublicSidebar userName={user.name} />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5">{children}</div>
        </div>
      </SidebarProvider>
    </SessionWrapper>
  );
}
