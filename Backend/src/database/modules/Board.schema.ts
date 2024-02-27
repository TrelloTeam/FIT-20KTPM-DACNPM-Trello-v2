import mongoose from 'mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { ActivityMSchema } from './Activity.schema'
const { Schema } = mongoose

export const BoardLabelMSchema = new Schema<DbSchemas.BoardSchema.BoardLabel>({
  color: String,
  name: String,
})

export const BoardMSchema = new Schema<DbSchemas.BoardSchema.Board>({
  name: String,
  workspace_id: String,
  background: String,
  activities: [ActivityMSchema],
  members_email: [String],
  labels: [BoardLabelMSchema],
  is_star: Boolean,
  watcher_email: [String],
  visibility: [String],
})
