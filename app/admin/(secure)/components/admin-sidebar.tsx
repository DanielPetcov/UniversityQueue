"use client";

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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Book,
  BookUser,
  ChevronUp,
  Home,
  LogOut,
  User2,
  UserRound,
  UserStar,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Create user",
    href: "/admin/users/new",
    icon: UserStar,
  },
  {
    title: "Create student",
    href: "/admin/students/new",
    icon: UserRound,
  },
  {
    title: "Create course",
    href: "/admin/courses/new",
    icon: Book,
  },
  {
    title: "Create group",
    href: "/admin/groups/new",
    icon: BookUser,
  },
];
export default function AdminSidebar() {
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
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent className="list-none">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem>
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
