"use client";

import Link from "next/link";

import { ChevronUp, Home, LogOut, User2 } from "lucide-react";

import { useUser } from "@/states";
import { deleteCookie } from "@/actions";
import { createLinksSuperAdmin } from "@/data";

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
import SidebarGroupLinks from "../sidebar-group-links";

export function SuperAdminSidebar() {
  const { userName } = useUser();

  const ClearToken = async () => {
    await deleteCookie("token");
    location.reload();
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
        <SidebarGroupLinks links={createLinksSuperAdmin} label="Delete" />
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
