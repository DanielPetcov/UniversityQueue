import z from "zod";

export const SignInSchemaAdmin = z.object({
  name: z.string(),
  password: z.string(),
});

export const SignInSchemaPublic = z.object({
  email: z.string(),
  password: z.string(),
});
