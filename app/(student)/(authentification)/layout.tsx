import { ReactNode } from "react";

import HowTo from "@/components/how-to";

export default async function AuthentificationLayoutStudent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 moving-pattern gap-5">
      {children}

      <HowTo />
    </div>
  );
}
