"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useUser } from "@/states";
import { StudentWithUser } from "@/interfaces";

import { DataTable } from "../data-table";
import { studentsColumns } from "./columns";

interface StudentsTableProps {
  className?: string;
}

export function StudentsTable({ className }: StudentsTableProps) {
  const { userId } = useUser();
  const [students, setStudents] = useState<StudentWithUser[]>([]);

  useEffect(() => {
    if (!userId) return;
    const getStudents = async () => {
      const response = await fetch(`/api/admins/${userId}/students`);
      if (response.ok) {
        const res: StudentWithUser[] = await response.json();
        setStudents(res);
      }
    };

    getStudents();
  }, [userId]);

  if (!userId) return <div>Loading...</div>;

  return (
    <>
      <div className={cn("space-y-2 bg-white p-4 rounded-md", className)}>
        <h3>Students</h3>
        <DataTable columns={studentsColumns} data={students} />
      </div>
    </>
  );
}
