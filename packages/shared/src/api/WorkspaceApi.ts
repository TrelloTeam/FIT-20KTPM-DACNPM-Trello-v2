import { z } from "zod";

import { Workspace, WorkspaceSchema } from "../schemas/Workspace";

export const GetallWorkspaceByEmailResponseSchema = z.object({
  data: WorkspaceSchema.array(),
});
export type GetallWorkspaceByEmailResponse = z.infer<
  typeof GetallWorkspaceByEmailResponseSchema
>;

export const GetallWorkspaceResponseSchema = z.object({
  data: WorkspaceSchema.array(),
});
export type GetallWorkspaceResponse = z.infer<
  typeof GetallWorkspaceResponseSchema
>;

export type CreateWorkspaceRequest = Pick<
  Workspace,
  "name" | "description" | "members_email"
>;
export type CreateWorspaceResponse = Workspace;

export const UpdateWorkspaceInfoRequestSchema = WorkspaceSchema.omit({
  _id: true,
  type_id: true,
  members_email: true,
}).partial();
export type UpdateWorkspaceInfoRequest = z.infer<
  typeof UpdateWorkspaceInfoRequestSchema
>;

export const ChangeWorkspaceVisiblitySchema = WorkspaceSchema.pick({
  visibility: true,
});
export type ChangeWorkspaceVisiblity = z.infer<
  typeof ChangeWorkspaceVisiblitySchema
>;

export const InviteWorkspaceSchema = z.object({ email: z.string() });
export type InviteWorkspace = z.infer<typeof InviteWorkspaceSchema>;
