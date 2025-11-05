import z from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  email: z.string(),
  userId: z.string(),
  groupId: z.string().nullable(),
});

export const NewStudentSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  email: z.string(),
});

export const UpdateStudentSchema = z.object({
  email: z.string(),
  groupId: z.string().optional(),
});

export const DeleteStudentSchema = z.object({
  id: z.string(),
});
