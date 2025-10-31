import { SidebarLink } from "@/interfaces";
import { Book, BookUser, UserRound, UserStar } from "lucide-react";

export const createLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/users/new",
    title: "Create user",
    icon: UserStar,
  },
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
  {
    href: "/admin/groups/new",
    title: "Create group",
    icon: BookUser,
  },
];

export const updateLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/users/update",
    title: "Update user",
    icon: UserStar,
  },
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
