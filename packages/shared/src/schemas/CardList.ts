import { z } from "zod";
import { ActivitySchema } from "./Activity";
import { Feature, FeatureSchema } from "./Feature";

export const CardSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  index: z.number().nullish(),
  watcher_email: z.string().array().default([]),
  archive_at: z.coerce.date().nullish(),
  activities: ActivitySchema.array().default([]),
  features: FeatureSchema.passthrough().array().default([]),
});

export const CardlistSchema = z.object({
  _id: z.string().optional(),
  board_id: z.string(),
  index: z.number().nullish(),
  name: z.string(),
  cards: CardSchema.array().default([]),
  watcher_email: z.string().array().default([]),
  archive_at: z.coerce.date().nullish(),
  created_at: z.coerce.date().nullish(),
});

export type ICard = z.infer<typeof CardSchema>;
export type CardList = z.infer<typeof CardlistSchema>;

export type Card = ICard & { features: Feature[] };
