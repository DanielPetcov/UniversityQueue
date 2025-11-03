import z from "zod";

export const NewUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  admin: z.boolean().default(false),
});

export const UpdateUserSchema = z.object({
  name: z.string(),
  admin: z.boolean(),
});

export const DeleteUserSchema = z.object({
  id: z.string(),
});
