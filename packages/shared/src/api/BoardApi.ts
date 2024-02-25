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
