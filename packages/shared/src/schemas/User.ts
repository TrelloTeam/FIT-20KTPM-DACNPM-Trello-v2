import { z } from "zod";
import { ActivitySchema } from "./Activity";
import { Refine_MongoId } from "../utils/RefineMongoId";

export const UserSchema = z.object({
  _id: z.string().refine(Refine_MongoId, { message: "Invalid id" }).optional(),
  email: z.string(),
  username: z.string(),
  bio: z.string(),
  avatar: z.string(),
  activities: ActivitySchema.array().default([]),
  workspace_ids: z.string().array().default([]),
});

export type User = z.infer<typeof UserSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
