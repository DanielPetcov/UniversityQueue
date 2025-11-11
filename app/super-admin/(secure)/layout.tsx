import { ReactNode } from "react";
import { SessionWrapperSuperAdmin } from "@/auth";

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionWrapperSuperAdmin>{children}</SessionWrapperSuperAdmin>;
}
