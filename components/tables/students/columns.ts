"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

const StudentsColumnsSchema = z.object({
  id: z.string(),
  email: z.string(),
  user: z
    .object({
      name: z.string(),
    })
    .nullable(),
});

export const studentsColumns: ColumnDef<
  z.infer<typeof StudentsColumnsSchema>
>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "user.name",
    header: "Username",
  },
];
