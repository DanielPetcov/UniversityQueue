"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const CoursesColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.object({
    name: z.string(),
  }),
});

export const coursesColumns: ColumnDef<z.infer<typeof CoursesColumnsSchema>>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "group.name",
      header: "Group",
    },
  ];
