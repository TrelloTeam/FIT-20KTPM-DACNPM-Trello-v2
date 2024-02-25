import { z } from "zod";

export const ActivitySchema = z.object({
  workspace_id: z.string(),
  board_id: z.string().nullish(),
  cardlist_id: z.string().nullish(),
  card_id: z.string().nullish(),
  content: z.string().default("No content"),
});
export type Activity = z.infer<typeof ActivitySchema>;
