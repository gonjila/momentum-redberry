import { z } from "zod";

export const commentOnTaskSchema = z.string().trim().min(3);
