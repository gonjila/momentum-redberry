import { z } from "zod";

import { inputLengthValidations } from "@/helpers";

export const createEmployeeSchema = z.object({
  name: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  surname: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  // avatar: z.object({}).required(),
  department_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
});

export type CreateEmployeeSchemaType = z.infer<typeof createEmployeeSchema>;

export const nameValidations = inputLengthValidations({ min: 2, max: 255 });
