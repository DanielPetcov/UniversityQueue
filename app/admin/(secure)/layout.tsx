import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./components/admin-sidebar";

import { GetUserIdToken, SessionWrapperAdmin } from "@/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) {
    redirect("/admin/sign-in");
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
    redirect("/admin/sign-in");
  }

  return (
    <SessionWrapperAdmin>
      <SidebarProvider className="relative">
        <AdminSidebar userName={user.name} />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5 bg-linear-to-r from-slate-300 to-slate-500">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </SessionWrapperAdmin>
  );
}
