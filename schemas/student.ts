import z from "zod";

export const NewStudentSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  email: z.string(),
});
