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

export type getBoardsByWorkspaceIdRequest = z.infer<typeof BoardSchema>["workspace_id"];

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

export type GetBoardInfoByBoardIdRequest = z.infer<typeof BoardSchema>["_id"];

export const GetBoardInfoByBoardIdResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type GetBoardInfoByBoardIdResponse = z.infer<typeof GetBoardInfoByBoardIdResponseSchema>;

///

export const ChangeBoardVisibilityRequestSchema = BoardSchema.pick({
  _id: true,
  visibility: true,
}).required({ _id: true });
export type ChangeBoardVisibilityRequest = z.infer<typeof ChangeBoardVisibilityRequestSchema>;

export const ChangeBoardVisibilityResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type ChangeBoardVisibilityResponse = z.infer<typeof ChangeBoardVisibilityResponseSchema>;

///

export type DeleteBoardRequest = z.infer<typeof BoardSchema>["_id"];

export const DeleteBoardResponseSchema = z.object({
  data: BoardSchema.nullable(),
});
export type DeleteBoardResponse = z.infer<typeof DeleteBoardResponseSchema>;
