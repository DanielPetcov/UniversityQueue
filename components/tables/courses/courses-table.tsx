"use client";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { useUser } from "@/states";
import { CourseWithTotalStackEntries } from "@/interfaces";

import { DataTable } from "../data-table";
import { coursesColumns } from "./columns";

interface CoursesTableProps {
  className?: string;
}

export function CoursesTable({ className }: CoursesTableProps) {
  const { userId } = useUser();
  const [courses, setCourses] = useState<CourseWithTotalStackEntries[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch(`/api/admins/${userId}/courses`);
      if (response.ok) {
        const res: CourseWithTotalStackEntries[] = await response.json();
        setCourses(res);
      }
    };

    getCourses();
  }, [userId]);

  if (!userId) return <div>Loading</div>;

  return (
    <>
      <div className={cn("space-y-2 bg-white p-4 rounded-md", className)}>
        <h3>Courses</h3>
        <DataTable columns={coursesColumns} data={courses} />
      </div>
    </>
  );
}
