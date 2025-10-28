import z from "zod";

export const NewUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  admin: z.boolean().default(false),
});
