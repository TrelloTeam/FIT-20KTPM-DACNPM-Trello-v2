import { z } from "zod";

import { Refine_MongoId } from "../utils/RefineMongoId";

export const STATUS_WORKSPACE = {
  owner: "owner",
  member: "member",
  guest: "guest",
  pending: "pending",
};

export const ROLE_WORKSPACE = {
  member: "member",
  admin: "admin",
};

export const VISIBILITY_WORKSPACE = {
  private: "private",
  public: "public",
};

export const MemberSchema = z.object({
  _id: z.string().refine(Refine_MongoId, { message: "Invalid id" }).optional(),
  status: z
    .union([
      z.literal(STATUS_WORKSPACE.guest),
      z.literal(STATUS_WORKSPACE.pending),
      z.literal(STATUS_WORKSPACE.owner),
      z.literal(STATUS_WORKSPACE.member),
    ])
    .optional(),
  role: z
    .union([z.literal(ROLE_WORKSPACE.admin), z.literal(ROLE_WORKSPACE.member)])
    .default(ROLE_WORKSPACE.member),
  email: z.string().nullable(),
});

export const WorkspaceSchema = z.object({
  _id: z.string().refine(Refine_MongoId, { message: "Invalid id" }).optional(),
  name: z.string(),
  short_name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
  logo: z.string().default(""),
  type_id: z.string().nullish(),
  visibility: z
    .union([
      z.literal(VISIBILITY_WORKSPACE.public),
      z.literal(VISIBILITY_WORKSPACE.private),
    ])
    .default(VISIBILITY_WORKSPACE.private),
  members: MemberSchema.array().default([]),
});

export type Member = z.infer<typeof MemberSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
