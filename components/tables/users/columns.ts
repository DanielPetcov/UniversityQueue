"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const UsersColumnsSchema = z.object({
  id: z.string(),
  admin: z.boolean(),
  name: z.string(),
  student: z
    .object({
      id: z.string(),
    })
    .nullable(),
});

export const usersColumns: ColumnDef<z.infer<typeof UsersColumnsSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "admin",
    header: "Is admin",
  },
  {
    accessorKey: "student.id",
    header: "Student ID",
  },
];
