import { z } from "zod";
import { ActivitySchema } from "./Activity";

export const BoardLabelSchema = z.object({
  _id: z.string().optional(),
  color: z.string(),
  name: z.string(),
});

export const BoardSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  workspace_id: z.string(),
  activities: ActivitySchema.array().default([]),
  members_email: z.string().array().default([]),
  labels: BoardLabelSchema.array().default([]),
  is_star: z.boolean().default(false),
  watcher_email: z.string().array().default([]),
  visibility: z.union([
    z.literal("private"),
    z.literal("workspace"),
    z.literal("public"),
  ]),
});

export type BoardLabel = z.infer<typeof BoardLabelSchema>;
export type Board = z.infer<typeof BoardSchema>;
