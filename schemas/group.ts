import z from "zod";

export const NewGroupSchema = z.object({
  name: z.string(),
  adminKey: z.string(),
});

export const UpdateGroupSchema = z.object({
  name: z.string(),
});

export const DeleteGroupSchema = z.object({
  id: z.string(),
});
