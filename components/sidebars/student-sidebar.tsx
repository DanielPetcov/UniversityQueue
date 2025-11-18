"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ChevronUp,
  Database,
  Home,
  LogOut,
  Settings,
  User2,
} from "lucide-react";

import { Course } from "@/app/generated/prisma/client";
import { useUser } from "@/states";
import { CourseLink } from "@/interfaces";
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentSettings } from "./student-settings";

export function StudentSidebar() {
  const { userName, userId } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [courses, setCourses] = useState<CourseLink[]>();

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`/api/courses`);

      if (response.ok) {
        const res: Course[] = await response.json();
        setCourses([
          ...res.map((item) => ({
            href: `/courses/${item.id}`,
            title: item.name,
            icon: Database,
          })),
        ]);
      }
    };

    getCourses();
  }, []);

  const ClearToken = async () => {
    await deleteCookie("token");
    location.reload();
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Button variant={"link"} asChild className="w-fit">
            <Link href="/">
              <Home className="w-5 h-5" />
              <span>HOME</span>
            </Link>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Courses</SidebarGroupLabel>
            <SidebarGroupContent className="list-none">
              {courses &&
                courses.map((course) => (
                  <SidebarMenuItem key={course.title}>
                    <SidebarMenuButton asChild>
                      <Link href={course.href}>
                        <course.icon />
                        <span>{course.title}</span>
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <StudentSettings userId={userId} userName={userName} />
        </DialogContent>
      </Dialog>
    </>
  );
}
