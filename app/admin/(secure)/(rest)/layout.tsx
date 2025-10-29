import { ReactNode } from "react";

export default function CreateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
}
