import z from "zod";

export const SignUpSchemaAdmin = z.object({
  name: z.string(),
  password: z.string(),
});
