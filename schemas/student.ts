import z from "zod";

const NewStudentSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
  email: z.string(),
});

export default NewStudentSchema;
