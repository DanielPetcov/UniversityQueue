import { ReactNode } from "react";

import { SessionWrapper } from "@/auth";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <SessionWrapper>{children}</SessionWrapper>;
}
