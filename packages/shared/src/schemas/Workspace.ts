import { z } from "zod";
import { Refine_MongoId } from "../utils/RefineMongoId";

export const WorkspaceSchema = z.object({
  _id: z.string().refine(Refine_MongoId, { message: "Invalid id" }).optional(),
  name: z.string(),
  short_name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
  logo: z.string().default(""),
  type_id: z.string().nullish(),
  owner_email: z.string(),
  visibility: z
    .union([z.literal("public"), z.literal("private")])
    .default("private"),
  members_email: z.string().array().default([]),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;
