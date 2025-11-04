"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const CoursesColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const coursesColumns: ColumnDef<z.infer<typeof CoursesColumnsSchema>>[] =
  [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];
