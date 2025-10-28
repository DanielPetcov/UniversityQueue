import z from "zod";

export const dayOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const NewCourseSchema = z.object({
  name: z.string(),
  dayOpen: z.enum(dayOfWeek),
  hourOpen: z.string().regex(timeRegex, "Time must be in HH:MM 24-hour format"),
});
