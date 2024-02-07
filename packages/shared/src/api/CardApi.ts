import { z } from "zod";
import { CardSchema, CardlistSchema } from "../schemas/CardList";
import { Refine_MongoId } from "../utils/RefineMongoId";

export const CreateCardRequestSchema = CardSchema.omit({
  _id: true,
  watcher_email: true,
  archive_at: true,
  activities: true,
  features: true,
}).merge(
  z.object({
    index: z.number().default(0),
    cardlist_id: z.string().refine(Refine_MongoId, { message: "Invalid id" }),
  })
);
export type CreateCardRequest = z.infer<typeof CreateCardRequestSchema>;

export const CreateCardRespondSchema = z.object({
  data: CardSchema.required({ _id: true }),
});
export type CreateCardRespond = z.infer<typeof CreateCardRespondSchema>;

export const GetAllCardsOfCardlistRequestSchema = z.object({
  cardlist_id: z.string().refine(Refine_MongoId, { message: "Invalid id" }),
});
export type GetCardsOfCardlistRequest = z.infer<
  typeof GetAllCardsOfCardlistRequestSchema
>;

export const GetAllCardsOfCardlistResponseSchema = z.object({
  data: CardlistSchema.merge(
    z.object({
      cards: CardSchema.required({ _id: true })
        .omit({
          activities: true,
          features: true,
        })
        .array(),
    })
  ),
});
export type GetAllCardsOfCardlistResponse = z.infer<
  typeof GetAllCardsOfCardlistResponseSchema
>;
