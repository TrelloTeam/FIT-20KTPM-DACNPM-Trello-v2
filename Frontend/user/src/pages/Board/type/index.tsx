export interface Card {
  id: string
  list_id: string
  order: number
  name: string
  list_name: string
}
export interface CardComponentProps {
  card: Card
}
export interface List {
  id: string
  board_id: number
  order: number
  name: string
  data: Card[]
}
export interface ListComponentProps {
  list: List
}
export interface ListsComponentProps {
  lists: List[]
}
