import z from "zod";

export const NewGroupSchema = z.object({
  name: z.string(),
});
