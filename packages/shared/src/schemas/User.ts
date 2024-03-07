import { z } from "zod";
import { ActivitySchema } from "./Activity";

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string(),
  username: z.string(),
  bio: z.string(),
  avatar: z.string(),
  activities: ActivitySchema.array().default([]),
  workspace_ids: z.string().array().default([]),
});

export type User = z.infer<typeof UserSchema>;
