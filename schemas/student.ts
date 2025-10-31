import z from "zod";

export const NewStudentSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  email: z.string(),
});

export const UpdateStudentSchema = z.object({
  email: z.string(),
  groupId: z.string().optional(),
});
