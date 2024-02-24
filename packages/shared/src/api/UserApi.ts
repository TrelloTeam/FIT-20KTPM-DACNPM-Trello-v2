import { z } from "zod";
import { UserSchema } from "../schemas/User";

// create user
export const CreateUserRequestSchema = UserSchema.omit({
  _id: true,
  activities: true,
  workspace_ids: true,
});
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const CreateUserResponseSchema = z.object({
  data: UserSchema,
});
export type CreateUserResponse = z.infer<
  typeof CreateUserResponseSchema
>;

// get all user
export const GetallUserResponseSchema = z.object({
  data: UserSchema.array(),
});
export type GetallUserResponse = z.infer<
  typeof GetallUserResponseSchema
>;

// get user
export const GetUserResponseSchema = z.object({
  data: UserSchema,
});
export type GetUserResponse = z.infer<
  typeof GetUserResponseSchema
>;

// update user
export const UpdateUserRequestSchema = UserSchema.omit({
  _id: true
});
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;

export const UpdateUserResponseSchema = z.object({
  data: UserSchema,
});
export type UpdateUserResponse = z.infer<
  typeof UpdateUserResponseSchema
>;