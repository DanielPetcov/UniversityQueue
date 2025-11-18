import z from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  email: z.string(),
  userId: z.string(),
  groupId: z.string(),
});

export const NewStudentSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(5),
  userId: z.string(),
});

export const UpdateStudentSchema = z.object({
  email: z.string(),
});

export const DeleteStudentSchema = z.object({
  id: z.string(),
});

export const SubscribeSchema = z.object({
  comment: z.string().optional(),
});
