import { ReactNode } from "react";

import { SessionWrapperAdmin } from "@/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AdminSidebar } from "@/components/sidebars";
import Footer from "@/components/footer";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionWrapperAdmin>
      <SidebarProvider className="relative">
        <AdminSidebar />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5 bg-linear-to-r from-slate-300 to-slate-500">
            {children}
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </SessionWrapperAdmin>
  );
}
