import { ReactNode } from "react";

import { SessionWrapperStudent } from "@/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { StudentSidebar } from "@/components/sidebars";
import Footer from "@/components/footer";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionWrapperStudent>
      <SidebarProvider>
        <StudentSidebar />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="flex-1 p-5">{children}</div>
          <Footer />
        </div>
      </SidebarProvider>
    </SessionWrapperStudent>
  );
}
