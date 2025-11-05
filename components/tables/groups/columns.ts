"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const GroupsColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  _count: z.object({
    students: z.number(),
    courses: z.number(),
  }),
});

export const groupsColumns: ColumnDef<z.infer<typeof GroupsColumnsSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "_count.students",
    header: "Total Students",
  },
  {
    accessorKey: "_count.courses",
    header: "Total Courses",
  },
];
