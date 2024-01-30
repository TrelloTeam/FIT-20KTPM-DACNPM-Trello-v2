import React, { useState, useEffect, DragEvent } from 'react'
import { lists, cards } from './testData/test_data'
import { List, Card } from './type/index'
import { ListsComponent } from './components'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
export function Board() {
  const [listsData, setListsData] = useState<List[]>(lists)
  const [cardsData, setCardsData] = useState<Card[]>(cards)
  const [isDragCardToCard, setIsDragCardToCard] = useState<Boolean>(false)
  const [isMoveList, setIsMoveList] = useState<Boolean>(false)
  const [action, setAction] = useState<Boolean>(false)

  useEffect(() => {
    console.log('update list')
    // You can call your API update function here
  }, [action])

  function moveCard(card: Card, toList: List, toCard?: Card, isDropAbove?: Boolean) {
    // Call API để thay đổi thẻ

    // Nếu toCard khác null,
    // nghĩa là kéo 1 thẻ đè lên 1 thẻ
    // sẽ tiến hành thay đổi vị trí của thẻ
    // Nếu vị trí drop nằm ở nửa trên của thẻ (isDropAbove = true), thẻ tại vị trí đó sẽ di chuyển xuống dưới nhường chỗ cho thẻ mới
    // Nếu vị trí drop nằm ở nửa dưới của thẻ (isDropAbove = false), thẻ tại vị trí đó sẽ di chuyển lên trên nhường chỗ cho thẻ mới

    // Nếu toCard là null, nghĩa là kéo 1 thẻ sang khoảng trống ở dưới của list, sẽ thêm thẻ đó ở dưới của list đó

    if (isDropAbove) {
      console.log('drop above')
    } else {
      console.log('drop below')
    }
  }

  function moveList(fromList: List, toList: List, isDropLeft?: Boolean) {
    // Call API để thay đổi list
    // Nếu vị trí drop nằm ở nửa trái của list (isDropLeft = true), thẻ tại vị trí đó sẽ di chuyển sang phải nhường chỗ cho thẻ mới
    // Nếu vị trí drop nằm ở nửa phỉa của list (isDropLeft = false), thẻ tại vị trí đó sẽ di chuyển sang trái nhường chỗ cho thẻ mới

    if (isDropLeft) {
      console.log('drop left')
    } else {
      console.log('drop right')
    }
  }
  function handleDragEnd(e: DragEndEvent) {
    console.log('handleDragEnd: ', e)
  }

  return (
    <div
      onDragEnd={() => {
        setIsDragCardToCard(false)
        setIsMoveList(false)
      }}
    >
      <div className='mx-auto p-4 text-center text-3xl font-bold uppercase text-black'>Trello Board</div>
      <DndContext onDragEnd={(e) => handleDragEnd(e)}>
        <ListsComponent lists={lists} />
      </DndContext>
    </div>
  )
}
