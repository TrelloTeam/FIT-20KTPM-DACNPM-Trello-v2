import { z } from "zod";
import { Refine_MongoId } from "../utils/RefineMongoId";

export const ActivitySchema = z.object({
  _id: z.string().refine(Refine_MongoId, { message: "Invalid id" }).optional(),
  workspace_id: z.string(),
  board_id: z.string().nullish(),
  cardlist_id: z.string().nullish(),
  card_id: z.string().nullish(),
  content: z.string().default("No content"),
});
export type Activity = z.infer<typeof ActivitySchema>;
