import { z } from "zod";
import { CardSchema } from "../schemas/CardList";

export const CreateCardSchema = CardSchema.omit({
  _id: true,
  watcher_email: true,
  archive_at: true,
  activities: true,
  features: true,
}).merge(
  z.object({
    index: z.number().default(0),
    cardlist_id: z.string(),
  })
);
export type CreateCard = z.infer<typeof CreateCardSchema>;
