import z from "zod";

export const SignInSchema = z.object({
  name: z.string(),
  password: z.string(),
});
