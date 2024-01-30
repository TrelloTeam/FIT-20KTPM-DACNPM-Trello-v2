import { DbSchemas } from '@trello-v2/shared'
import mongoose, { Model } from 'mongoose'

const { Schema } = mongoose

export const WorkspaceMSchema = new Schema<DbSchemas.WorkspaceSchema.Workspace>(
  {
    name: String,
    short_name: String,
    description: String,
    website: String,
    logo: String,
    type_id: String,
    owner_email: String,
    visibility: String,
    members_email: [String],
  },
)
