import mongoose from 'mongoose'

import { DbSchemas } from '@trello-v2/shared'

const { Schema } = mongoose

export const MemberMSchema = new Schema<DbSchemas.WorkspaceSchema.Member>({
  status: String,
  role: String,
  email: String,
})

export const WorkspaceMSchema = new Schema<DbSchemas.WorkspaceSchema.Workspace>({
  name: String,
  short_name: String,
  description: String,
  website: String,
  logo: String,
  type_id: String,
  visibility: String,
  members: [MemberMSchema],
})
