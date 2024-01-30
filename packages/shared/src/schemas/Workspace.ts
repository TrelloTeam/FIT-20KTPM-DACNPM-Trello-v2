import { z } from "zod";

export const WorkspaceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  short_name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
  logo: z.string().default(""),
  type_id: z.string().nullish(),
  owner_email: z.string(),
  visibility: z.union([z.literal("public"), z.literal("private")]),
  members_email: z.string().array().default([]),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;
