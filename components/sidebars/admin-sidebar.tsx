"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronUp, Home, LogOut, Settings, User2 } from "lucide-react";

import { useUser } from "@/states";
import { deleteCookie } from "@/actions";
import { createLinksAdmin, deleteLinksAdmin, updateLinksAdmin } from "@/data";
import SidebarGroupLinks from "@/components/sidebar-group-links";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { AdminSettings } from "./admin-settings";

export function AdminSidebar() {
  const { userName, userId, clearUser } = useUser();
  const [openDialog, setOpenDialog] = useState(false);

  const SignOut = async () => {
    clearUser();
    await deleteCookie("token");
    location.reload();
  };

  return (
    <>
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
                  <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                    <span>Settings</span>
                    <Settings className="ml-auto" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={SignOut}>
                    <span>Sign out</span>
                    <LogOut className="ml-auto" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <AdminSettings userId={userId} />
        </DialogContent>
      </Dialog>
    </>
  );
}
