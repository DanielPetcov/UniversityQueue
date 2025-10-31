import { ReactNode } from "react";

import { SessionWrapper } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PublicSidebar from "./components/public-sidebar";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionWrapper>
      <SidebarProvider>
        <PublicSidebar />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5">{children}</div>
        </div>
      </SidebarProvider>
    </SessionWrapper>
  );
}
