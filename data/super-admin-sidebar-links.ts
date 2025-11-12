import { UserStar } from "lucide-react";
import { SidebarLink } from "@/interfaces";

export const createLinksSuperAdmin: SidebarLink[] = [
  {
    href: "/super-admin/groups/delete",
    title: "Delete a group",
    icon: UserStar,
  },
];
