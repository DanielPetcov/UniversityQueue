import z from "zod";
import { StudentSchema } from "./student";

export const NewGroupSchema = z.object({
  name: z.string(),
});

export const UpdateGroupSchema = z.object({
  name: z.string(),
  students: z.array(StudentSchema),
});

export const DeleteGroupSchema = z.object({
  id: z.string(),
});
