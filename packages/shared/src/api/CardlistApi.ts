import { z } from "zod";
import { CardlistSchema } from "../schemas";

export const CreateCardlistRequestSchema = CardlistSchema.CardlistSchema.omit({
  _id: true,
  cards: true,
  watcher_email: true,
});
export const GetallCardlistByBoardIdRequestSchema =
  CardlistSchema.CardlistSchema.omit({
    board_id: true,
  });
export const CreateCardlistResponseSchema = z.object({
  data: CardlistSchema.CardlistSchema,
});
export const GetallCardlistResponseSchema = z.object({
  data: CardlistSchema.CardlistSchema.array(),
});

export const GetallCardlistByBoardIdResponseSchema = z.object({
  data: CardlistSchema.CardlistSchema.array(),
});

export type CreateCardlistRequest = z.infer<typeof CreateCardlistRequestSchema>;
export type GetallCardlistByBoardIdRequest = z.infer<
  typeof GetallCardlistByBoardIdRequestSchema
>;
export type CreateCardlistResponse = z.infer<
  typeof CreateCardlistResponseSchema
>;

export type GetallCardlistResponse = z.infer<
  typeof GetallCardlistResponseSchema
>;

export type GetallCardlistByBoardIdResponse = z.infer<
  typeof GetallCardlistByBoardIdResponseSchema
>;
