import { UniqueIdentifier } from '@dnd-kit/core'
import { DbSchemas } from '@trello-v2/shared'
import faker from 'faker'
const generateRandomDateOrNull = () => (faker.datatype.boolean() ? faker.date.past() : null)
export type Card = Omit<DbSchemas.CardlistSchema.ICard, 'placeHolder' | 'list_id' | '_id'> & {
  placeHolder: boolean
  list_id: string
  _id: UniqueIdentifier
}
export type List = Omit<DbSchemas.CardlistSchema.CardList, 'cards'|'_id'> & {
  cards: Card[]
  _id: UniqueIdentifier
}
// export interface Card {
//   id: string
//   list_id: string
//   order: number
//   name: string
//   list_name: string
//   watcher_email: Array<string>
//   placeHolder: boolean
// }
export const defaultCard = {
  _id: '',
  list_id: '',
  index: 1,
  name: '',
  features: [],
  cover: '',
  description: '',
  archive_at: generateRandomDateOrNull(),
  activities: [],
  watcher_email: []
}

export interface CardComponentProps {
  card: Card
  setOpenCardSetting: (data: UniqueIdentifier) => void
}
// export interface List {
//   _id: string
//   board_id: number
//   index: number
//   name: string
//   data: Array<Card>
// }
export interface ListComponentProps {
  list: List
  setOpenCardSetting: (data: UniqueIdentifier) => void
}
export interface ListsComponentProps {
  lists: List[] | undefined
  setOpenCardSetting: (data: UniqueIdentifier) => void
}
