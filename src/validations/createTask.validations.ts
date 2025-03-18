import { z } from "zod";

import { inputLengthValidations } from "@/helpers";

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(3, "მინიმუმ 3 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  description: z.string().trim().min(4, "მინიმუმ 4 სიმბოლო").max(255, "მაქსიმუმ 255 სიმბოლო").optional(),
  priority_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
  status_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
  // department_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
  employee_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
  // due_date: z.date({ required_error: "შეიყვანე ინფორმაცია" }),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;

export const titleValidations = inputLengthValidations({ min: 3, max: 255 });
export const descriptionValidations = inputLengthValidations({ min: 4, max: 255 });
