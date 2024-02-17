import React, { useState, useEffect, DragEvent } from 'react'
import { lists, cards } from './testData/test_data'
import { List, Card } from './type/index'
import { CardComponent, ListComponent, ListsComponent } from './components'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  DragOverEvent
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export function Board() {
  const [listsData, setListsData] = useState<List[]>(lists)
  const [activeDragItemId, setActiveDragItemId] = useState<string>('')
  const [activeDragItemType, setActiveDragItemType] = useState<string>('')
  const [activeDragItemData, setActiveDragItemData] = useState<any>()

  const [cardsData, setCardsData] = useState<Card[]>(cards)
  const [isDragCardToCard, setIsDragCardToCard] = useState<Boolean>(false)
  const [isMoveList, setIsMoveList] = useState<Boolean>(false)
  const [action, setAction] = useState<Boolean>(false)

  useEffect(() => {
    console.log('update list')
    console.log(listsData)
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
  function handleDragStart(e: DragStartEvent) {
    console.log('Drag Start: ', e)
    setActiveDragItemId(e?.active?.id.toString())
    setActiveDragItemType(e?.active?.data?.current?.list_id ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
  }

  function handleDragOver(e:DragOverEvent) {
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
      return
    }
    
  }

  function handleDragEnd(e: DragEndEvent) {
    console.log('handleDragEnd: ', e)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
    }

    const active = e.active
    const over = e.over
    if (over !== null && active.id !== over.id) {
      console.log('keo tha')

      const oldIndex = listsData.findIndex((data) => data.id === active.id)
      const newIndex = listsData.findIndex((data) => data.id === over.id)
      const newListsData = arrayMove(listsData, oldIndex, newIndex)
      setListsData(newListsData)
      setAction(!action)
    }
    setActiveDragItemId('')
    setActiveDragItemType('')
    setActiveDragItemData(null)
  }
  const customDropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <div>
      <div className='mx-auto p-4 text-center text-3xl font-bold uppercase text-black'>Trello Board</div>
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <ListsComponent lists={listsData} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemId || !activeDragItemType}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <ListComponent list={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardComponent card={activeDragItemData} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
