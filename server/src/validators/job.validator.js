import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3),
  company: z.string().min(2),
  location: z.string().min(2),
  description: z.string().min(10),

  salary: z.number().int().positive().optional(),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "CONTRACT",
  ]),

  experienceLevel: z.enum([
    "FRESHER",
    "JUNIOR",
    "MID",
    "SENIOR",
  ]),

  isRemote: z.boolean().optional(),

  vacancies: z.number().int().positive().optional(),
});