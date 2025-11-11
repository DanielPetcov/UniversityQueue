import z from "zod";

export const SignUpSchemaStudent = z.object({
  name: z.string(),
  email: z.string(),
  adminKey: z.string(),
  password: z.string(),
});

export const SignUpSchemaAdmin = z.object({
  name: z.string(),
  password: z.string(),
});
