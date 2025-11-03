import { SidebarLink } from "@/interfaces";
import {
  Book,
  BookMinus,
  BookUser,
  BookX,
  UserMinus2,
  UserRound,
  UserStar,
} from "lucide-react";

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

export const deleteLinksAdmin: SidebarLink[] = [
  {
    href: "/admin/users/delete",
    title: "Delete user",
    icon: UserMinus2,
  },
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
  {
    href: "/admin/groups/delete",
    title: "Delete group",
    icon: BookX,
  },
];
