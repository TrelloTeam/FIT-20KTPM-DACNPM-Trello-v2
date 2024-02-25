import mongoose from 'mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { ActivityMSchema } from './Activity.schema'

export const UserMSchema = new mongoose.Schema<DbSchemas.UserSchema.User>({
  username: String,
  bio: String,
  avatar: String,
  activities: [ActivityMSchema],
  workspace_ids: [String],
})
