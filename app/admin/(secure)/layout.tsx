import { ReactNode } from "react";

import { SessionWrapperAdmin } from "@/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebarWrapper } from "@/components/sidebars";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionWrapperAdmin>
      <SidebarProvider className="relative">
        <AdminSidebarWrapper />
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
