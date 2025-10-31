"use client";

import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { SidebarLink } from "@/interfaces";

interface SidebarGroupLinksProps {
  links: SidebarLink[];
  label: string;
}

export default function SidebarGroupLinks({
  links,
  label,
}: SidebarGroupLinksProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent className="list-none">
        {links.map((link) => (
          <SidebarMenuItem key={link.title}>
            <SidebarMenuButton asChild>
              <Link href={link.href}>
                <link.icon />
                <span>{link.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
