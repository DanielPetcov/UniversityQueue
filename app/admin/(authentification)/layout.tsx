import { ReactNode } from "react";

export default async function AuthentificationLayoutAdmin({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 moving-pattern-circle">
      {children}
    </div>
  );
}
