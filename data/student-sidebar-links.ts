import { SidebarLink } from "@/interfaces";
import { UserStar } from "lucide-react";

export const createLinksStudent: SidebarLink[] = [
  {
    href: "/admin/users/new",
    title: "Create user",
    icon: UserStar,
  },
];
