import { ReactNode } from "react";

export default async function AuthentificationLayoutStudent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 moving-pattern">
      {children}
    </div>
  );
}
