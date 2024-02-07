import { z } from "zod";
import { CardlistSchema } from "../schemas/CardList";

export const CreateCardlistRequestSchema = CardlistSchema.omit({
  _id: true,
  cards: true,
  watcher_email: true,
}).merge(
  z.object({
    index: z.number().default(0),
  })
);
export type CreateCardlistRequest = z.infer<typeof CreateCardlistRequestSchema>;

export type CopyCardlistRequest = z.infer<typeof CopyCardlistRequestSchema>;

export const CopyCardlistRequestSchema = CardlistSchema.omit({
  board_id: true,
  index: true,
  name: true,
  cards: true,
  watcher_email: true,
  archive_at: true,
});

//name, archive date, index
export const UpdateCardlistRequestSchema = CardlistSchema.omit({
  board_id: true,
  cards: true,
  watcher_email: true,
  created_at: true,
}).merge(
  z.object({
    index: z.number().optional(),
    archive_at: z.coerce.date().optional(),
    name: z.string().optional(),
  })
);
export type UpdateCardlistRequest = z.infer<typeof UpdateCardlistRequestSchema>;

export const CreateCardlistResponseSchema = z.object({
  data: CardlistSchema,
});
export type CreateCardlistResponse = z.infer<
  typeof CreateCardlistResponseSchema
>;

export const CopyCardlistResponseSchema = z.object({
  data: CardlistSchema,
});
export type CopyCardlistResponse = z.infer<typeof CreateCardlistResponseSchema>;

export const UpdateCardlistResponseSchema = z.object({
  data: CardlistSchema,
});
export type UpdateCardlistResponse = z.infer<
  typeof CreateCardlistResponseSchema
>;

export const GetallCardlistResponseSchema = z.object({
  data: CardlistSchema.array(),
});
export type GetallCardlistResponse = z.infer<
  typeof GetallCardlistResponseSchema
>;

export const GetallCardlistByBoardIdResponseSchema = z.object({
  data: CardlistSchema.array(),
});
export type GetallCardlistByBoardIdResponse = z.infer<
  typeof GetallCardlistByBoardIdResponseSchema
>;
