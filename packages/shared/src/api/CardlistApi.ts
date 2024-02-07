import { z } from "zod";
import { CardlistSchema } from "../schemas/CardList";

// export const CreateCardlistRequestSchema = CardlistSchema.CardlistSchema.omit({
//   _id: true,
//   cards: true,
//   watcher_email: true,
// });
export const CreateCardlistRequestSchema = CardlistSchema.omit({
  _id: true,
  board_id: true,
  name: true,
  cards: true,
  watcher_email: true,
  archive_at: true,
}).merge(
  z.object({
    index: z.number().default(0),
  })
);

export type CreateCardlistRequest = z.infer<typeof CreateCardlistRequestSchema>;

export const GetallCardlistByBoardIdRequestSchema = CardlistSchema.omit({
  board_id: true,
});
export const CreateCardlistResponseSchema = z.object({
  data: CardlistSchema,
});
export const GetallCardlistResponseSchema = z.object({
  data: CardlistSchema.array(),
});

export const GetallCardlistByBoardIdResponseSchema = z.object({
  data: CardlistSchema.array(),
});

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
