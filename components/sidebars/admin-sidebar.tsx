"use client";

import { deleteCookie } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronUp, Home, LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createLinksAdmin, deleteLinksAdmin, updateLinksAdmin } from "@/data";
import SidebarGroupLinks from "@/components/sidebar-group-links";

interface AdminSidebarProps {
  userName: string;
}

export function AdminSidebar({ userName }: AdminSidebarProps) {
  const router = useRouter();

  const ClearToken = async () => {
    await deleteCookie("token");
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Button variant={"link"} asChild className="w-fit">
          <Link href="/admin">
            <Home className="w-5 h-5" />
            <span>HOME</span>
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLinks links={createLinksAdmin} label="Create" />
        <SidebarGroupLinks links={updateLinksAdmin} label="Update" />
        <SidebarGroupLinks links={deleteLinksAdmin} label="Delete" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem onClick={ClearToken}>
                  <span>Sign out</span>
                  <LogOut className="ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
