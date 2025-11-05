import z from "zod";

export const NewCourseSchema = z.object({
  name: z.string(),
  groupId: z.string(),
});

export const UpdateCourseSchema = z.object({
  name: z.string(),
});

export const DeleteCourseSchema = z.object({
  id: z.string(),
});
