import { ReactNode } from "react";

export function LabelInputWrapper({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}
