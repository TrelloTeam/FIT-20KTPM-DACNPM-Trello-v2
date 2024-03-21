import { DbSchemas, TrelloApi } from '@trello-v2/shared'
import { z } from 'zod'

const FeatureDataSchema = z.discriminatedUnion('type', [
  DbSchemas.FeatureSchema.FeatureLabelSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureChecklistSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureDateSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureAttachmentSchema.omit({ _id: true }),
])

console.log(FeatureDataSchema.parse([{ type: 'attachment', link: 'abc.com', _id: '123' }]))

export const CardlistDuplicateDataResponseSchema = z.object({
  data: DbSchemas.CardlistSchema.CardlistSchema.omit({ _id: true, cards: true }).merge(
    z.object({
      cards: DbSchemas.CardlistSchema.CardSchema.omit({ _id: true, features: true }).merge(
        z.object({
          features: FeatureDataSchema.array(),
        }),
      ),
    }),
  ),
})
