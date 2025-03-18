import { z } from "zod";

import { inputLengthValidations } from "@/helpers";

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "შეიყვანეთ მნიშვნელობა" })
    .min(3, "მინიმუმ 3 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  description: z.string().min(4, "მინიმუმ 4 სიმბოლო").max(255, "მაქსიმუმ 255 სიმბოლო").optional(),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;

export const titleValidations = inputLengthValidations({ min: 3, max: 255 });
export const descriptionValidations = inputLengthValidations({ min: 4, max: 255 });
