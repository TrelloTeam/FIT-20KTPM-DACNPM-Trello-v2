import { z } from "zod";
import { BoardSchema } from "../schemas/Board";

export const GetallBoardRequestSchema = z.object({
  workspace_id: z.string(),
});
export type GetallBoardRequest = z.infer<typeof GetallBoardRequestSchema>;

export const GetallBoardResponseSchema = z.object({
  data: BoardSchema.array(),
});
export type GetallBoardResponse = z.infer<typeof GetallBoardResponseSchema>;

///

export const getBoardsByWorkspaceIdResponseSchema = z.object({
  data: BoardSchema.array(),
});
export type getBoardsByWorkspaceIdResponse = z.infer<typeof GetallBoardResponseSchema>;

///

export const CreateBoardRequestSchema = BoardSchema.pick({
  workspace_id: true,
  name: true,
  visibility: true,
});
export type CreateBoard = z.infer<typeof CreateBoardRequestSchema>;

export const CreateBoardResponseSchema = z.object({
  data: BoardSchema,
});
export type CreateBoardResponse = z.infer<typeof CreateBoardResponseSchema>;

///

export const GetBoardInfoByBoardIdResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type GetBoardInfoByBoardIdResponse = z.infer<typeof GetBoardInfoByBoardIdResponseSchema>;

///

export const DeleteBoardResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type DeleteBoardResponse = z.infer<typeof DeleteBoardResponseSchema>;

///

export const UpdateBoardRequestSchema = BoardSchema.pick({
  name: true,
  background: true,
  is_star: true,
  visibility: true,
}).partial();
export type UpdateBoardRequest = z.infer<typeof UpdateBoardRequestSchema>;

export const UpdateBoardResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type UpdateBoardResponse = z.infer<typeof UpdateBoardResponseSchema>;
