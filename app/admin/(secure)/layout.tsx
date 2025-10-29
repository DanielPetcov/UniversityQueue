import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./components/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="w-full flex flex-col">
        <SidebarTrigger />
        <div className="flex-1 p-5">{children}</div>
      </div>
    </SidebarProvider>
  );
}
