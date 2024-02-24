import { z } from "zod";

import { WorkspaceSchema } from "../schemas/Workspace";

//
export const GetallWorkspaceByEmailResponseSchema = z.object({
  data: WorkspaceSchema.array(),
});
export type GetallWorkspaceByEmailResponse = z.infer<
  typeof GetallWorkspaceByEmailResponseSchema
>;

//
export const GetallWorkspaceResponseSchema = z.object({
  data: WorkspaceSchema.array(),
});
export type GetallWorkspaceResponse = z.infer<
  typeof GetallWorkspaceResponseSchema
>;

//
export const CreateWorkspaceRequestSchema = WorkspaceSchema.pick({
  name: true,
  description: true,
  members_email: true,
});
export type CreateWorspaceRequest = z.infer<
  typeof CreateWorkspaceRequestSchema
>;

export const CreateWorspaceResponseSchema = z.object({
  data: WorkspaceSchema,
});
export type CreateWorspaceResponse = z.infer<
  typeof CreateWorspaceResponseSchema
>;

//
export const UpdateWorkspaceInfoRequestSchema = WorkspaceSchema.omit({
  _id: true,
  type_id: true,
  members_email: true,
  visibility: true,
}).partial();
export type UpdateWorkspaceInfoRequest = z.infer<
  typeof UpdateWorkspaceInfoRequestSchema
>;

export const UpdateWorkspaceInfoResponseSchema = z.object({
  data: WorkspaceSchema,
});
export type UpdateWorkspaceInfoResponse = z.infer<
  typeof UpdateWorkspaceInfoResponseSchema
>;

//
export const ChangeWorkspaceVisibilityRequestSchema = WorkspaceSchema.pick({
  visibility: true,
});
export type ChangeWorkspaceVisibilityRequest = z.infer<
  typeof ChangeWorkspaceVisibilityRequestSchema
>;

export const ChangeWorkspaceVisibilityResponseSchema = z.object({
  data: WorkspaceSchema,
});
export type ChangeWorkspaceVisibilityResponse = z.infer<
  typeof ChangeWorkspaceVisibilityResponseSchema
>;

//
export const InviteWorkspaceSchema = z.object({ email: z.string() });
export type InviteWorkspace = z.infer<typeof InviteWorkspaceSchema>;
