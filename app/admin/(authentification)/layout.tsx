import HowTo from "@/components/how-to";

import { ReactNode } from "react";

export default async function AuthentificationLayoutAdmin({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100 moving-pattern-circle">
      {children}
      <HowTo />
    </div>
  );
}
