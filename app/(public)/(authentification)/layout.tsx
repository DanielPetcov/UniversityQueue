import { ReactNode } from "react";

export default function AuthentificationLayoutPublic({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-700">
      {children}
    </div>
  );
}
