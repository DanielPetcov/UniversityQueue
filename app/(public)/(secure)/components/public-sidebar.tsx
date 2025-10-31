"use client";

import { deleteCookie } from "@/actions";
import { Course } from "@/app/generated/prisma/client";
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
import { CourseLink } from "@/interfaces";

import { ChevronUp, Database, Home, LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicSidebar() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseLink[]>();

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`/api/courses`);

      if (response.ok) {
        const res: Course[] = await response.json();
        setCourses([
          ...res.map((item) => ({
            href: `/course/${item.id}`,
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
    router.refresh();
  };

  return (
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
                  <User2 /> Username
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
