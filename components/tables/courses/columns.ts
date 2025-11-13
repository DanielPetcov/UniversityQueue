"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const CoursesColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  stack: z
    .object({
      _count: z.object({
        stackEntries: z.number(),
      }),
    })
    .nullable(),
});

export const coursesColumns: ColumnDef<z.infer<typeof CoursesColumnsSchema>>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "stack._count.stackEntries",
      header: "Total queue",
    },
  ];
