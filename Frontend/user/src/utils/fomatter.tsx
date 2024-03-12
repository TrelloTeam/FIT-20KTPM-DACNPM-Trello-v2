import { Card, List, defaultCard } from '~/pages/Board/type'
export function generatePlaceHolderCard(list: List) {
  const cardPlaceHolder = {
    ...defaultCard,
    id: `${list.id}-placeHolderCard`,
    list_id: list.id,
    placeHolder: true
  } as Card
  return cardPlaceHolder
}
