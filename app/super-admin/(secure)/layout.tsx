import { ReactNode } from "react";

import { SessionWrapperSuperAdmin } from "@/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { SuperAdminSidebar } from "@/components/sidebars";
import Footer from "@/components/footer";

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionWrapperSuperAdmin>
      <SidebarProvider className="relative">
        <SuperAdminSidebar />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5 bg-linear-to-r from-slate-300 to-slate-500">
            {children}
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </SessionWrapperSuperAdmin>
  );
}
