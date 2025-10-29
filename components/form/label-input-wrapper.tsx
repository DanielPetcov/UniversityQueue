import { ReactNode } from "react";

export default function LabelInputWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="space-y-2">{children}</div>;
}
