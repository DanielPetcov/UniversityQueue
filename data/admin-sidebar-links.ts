import { Book, BookMinus, BookUser, UserMinus2, UserRound } from "lucide-react";

import { SidebarLink } from "@/interfaces";

export const createLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/students/new",
    title: "Create student",
    icon: UserRound,
  },
  {
    href: "/admin/courses/new",
    title: "Create course",
    icon: Book,
  },
];

export const updateLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/students/update",
    title: "Update student",
    icon: UserRound,
  },
  {
    href: "/admin/courses/update",
    title: "Update course",
    icon: Book,
  },
  {
    href: "/admin/groups/update",
    title: "Update group",
    icon: BookUser,
  },
];

export const deleteLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/students/delete",
    title: "Delete student",
    icon: UserMinus2,
  },
  {
    href: "/admin/courses/delete",
    title: "Delete course",
    icon: BookMinus,
  },
];
