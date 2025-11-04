"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const GroupsColumnsSchema = z.object({
  id: z.string(),
  name: z.string(),
  _count: z.object({
    students: z.number(),
  }),
});

export const groupsColumns: ColumnDef<z.infer<typeof GroupsColumnsSchema>>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "_count.students",
    header: "Total Students",
  },
];
