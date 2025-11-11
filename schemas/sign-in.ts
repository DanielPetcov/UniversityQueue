import z from "zod";

export const SignInSchemaStudent = z.object({
  email: z.string(),
  password: z.string(),
});

export const SignInSchemaAdmin = z.object({
  name: z.string(),
  password: z.string(),
});

export const SignInSchemaSuperAdmin = z.object({
  name: z.string(),
  password: z.string(),
});
