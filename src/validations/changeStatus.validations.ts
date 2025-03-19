import { z } from "zod";

export const changeStatusSchema = z.object({
  status_id: z.number({ required_error: "შეიყვანეთ ინფორმაცია" }),
});

export type ChangeStatusSchemaType = z.infer<typeof changeStatusSchema>;
