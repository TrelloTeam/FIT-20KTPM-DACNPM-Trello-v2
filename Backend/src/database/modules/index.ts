import * as ActivityMSchema from './Activity.schema'
import * as CardlistMSchema from './Cardlist.schema'
import * as BoardMSchema from './Board.schema'
import * as WorkspaceMschema from './Workspace.schema'
import * as UserMschema from './User.schema'

import { MongooseModule } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'

export const CardlistMModule = MongooseModule.forFeature([
  {
    name: DbSchemas.COLLECTION_NAMES[0],
    schema: CardlistMSchema.CardlistMSchema,
  },
])

export const BoardMModule = MongooseModule.forFeature([
  {
    name: DbSchemas.COLLECTION_NAMES[1],
    schema: BoardMSchema.BoardMSchema,
  },
])

export const WorkspaceMModule = MongooseModule.forFeature([
  {
    name: DbSchemas.COLLECTION_NAMES[2],
    schema: WorkspaceMschema.WorkspaceMSchema,
  },
])

export const UserMModule = MongooseModule.forFeature([
  {
    name: DbSchemas.COLLECTION_NAMES[3],
    schema: UserMschema.UserMSchema,
  },
])

export {
  ActivityMSchema,
  CardlistMSchema,
  BoardMSchema,
  WorkspaceMschema,
  UserMschema,
}
