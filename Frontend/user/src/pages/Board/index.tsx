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
  DragOverEvent,
  closestCorners,
  UniqueIdentifier
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { BoardLayout } from '~/layouts'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export function Board() {
  const [oldListWhenDragging, setOldListWhenDraggingCard] = useState<List>()
  const [listsData, setListsData] = useState<Array<List>>(lists)
  const [activeDragItemId, setActiveDragItemId] = useState<string>('')
  const [activeDragItemType, setActiveDragItemType] = useState<string>('')
  const [activeDragItemData, setActiveDragItemData] = useState<any>()

  // const [cardsData, setCardsData] = useState<Card[]>(cards)
  const [isDragCardToCard, setIsDragCardToCard] = useState<Boolean>(false)
  const [isMoveList, setIsMoveList] = useState<Boolean>(false)
  const [action, setAction] = useState<Boolean>(false)

  useEffect(() => {
    console.log('update list')
    console.log(listsData)
    // You can call your API update function here
  }, [action])

  function findListByCardId(cardId: any) {
    return listsData.find((list) => list?.data?.map((card) => card.id)?.includes(cardId))
  }
  function isCard(obj: any): obj is Card {
    return 'id' in obj && 'list_id' in obj && 'order' in obj && 'name' in obj && 'list_name' in obj
  }
  function handleUpdateAfterDragging() {
    // Gọi API update data ở phía backend
  }
  function handleMoveCardBetweenDifferenceColumn(
    overList: List,
    overCardId: UniqueIdentifier,
    active: any,
    over: any,
    activeList: List,
    activeDragingCardId: UniqueIdentifier,
    activeDraggingCardData: any
  ) {
    setListsData((prevList) => {
      const overCardIndex = overList?.data?.findIndex((card) => card.id === overCardId)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overList.data.length + 1

      const nextList = cloneDeep(prevList)
      const nextActiveList = nextList.find((list) => list.id === activeList.id)
      const nextOverList = nextList.find((list) => list.id === overList.id)

      if (nextActiveList) {
        nextActiveList.data = nextActiveList.data.filter((card) => card.id !== activeDragingCardId)
      }
      if (nextOverList) {
        nextOverList.data = nextOverList.data.filter((card) => card.id !== activeDragingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          list_id: nextOverList.id
        } as Card
        // Ensure activeDraggingCardData is not undefined before using it
        if (isCard(activeDraggingCardData)) {
          nextOverList.data.splice(newCardIndex, 0, rebuild_activeDraggingCardData)
        }
      }
      console.log('nextList = ', nextList)
      return nextList
    })
  }
  function handleDragStart(e: DragStartEvent) {
    console.log('Drag Start: ', e)
    setActiveDragItemId(e?.active?.id.toString())
    setActiveDragItemType(e?.active?.data?.current?.list_id ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)

    if (e?.active?.data?.current?.list_id) {
      setOldListWhenDraggingCard(findListByCardId(e?.active?.id))
    }
  }

  function handleDragOver(e: DragOverEvent) {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }
    // const active = e.active
    // const over = e.over
    const { active, over } = e
    if (!active || !over) {
      return
    }
    const {
      id: activeDragingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeList = findListByCardId(activeDragingCardId)
    const overList = findListByCardId(overCardId)
    if (!activeList || !overList) {
      console.log('!activeColumn')
      return
    }
    if (activeList.id !== overList.id) {
      console.log('Drag Over In')
      handleMoveCardBetweenDifferenceColumn(
        overList,
        overCardId,
        active,
        over,
        activeList,
        activeDragingCardId,
        activeDraggingCardData
      )
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    console.log('handleDragEnd: ', e)
    const { active, over } = e
    if (!active || !over) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeList = findListByCardId(activeDragingCardId)
      const overList = findListByCardId(overCardId)
      if (!activeList || !overList || !oldListWhenDragging) {
        console.log('!activeColumn')
        return
      }
      if (oldListWhenDragging.id !== overList.id) {
        handleMoveCardBetweenDifferenceColumn(
          overList,
          overCardId,
          active,
          over,
          activeList,
          activeDragingCardId,
          activeDraggingCardData
        )
      } else {
        const oldIndex = oldListWhenDragging.data.findIndex((data) => data.id === activeDragItemId)
        const newIndex = overList.data.findIndex((data) => data.id === overCardId)
        const newList = arrayMove(oldListWhenDragging.data, oldIndex, newIndex)
        setListsData((prevList) => {
          const nextList = cloneDeep(prevList)

          const targetList = nextList.find((list) => list.id === overList.id)
          if (targetList) {
            targetList.data = newList
          }
          return nextList
        })
        setAction(!action)
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        console.log('keo tha')

        const oldIndex = listsData.findIndex((data) => data.id === active.id)
        const newIndex = listsData.findIndex((data) => data.id === over.id)
        const newListsData = arrayMove(listsData, oldIndex, newIndex)
        setListsData(newListsData)
        handleUpdateAfterDragging()
        setAction(!action)
      }
    }

    setActiveDragItemId('')
    setActiveDragItemType('')
    setActiveDragItemData(null)
    setOldListWhenDraggingCard(undefined)
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
    <BoardLayout>
      <div className='mx-auto p-4 text-center text-3xl font-bold uppercase text-black'>Header Area</div>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ListsComponent lists={listsData} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemId || !activeDragItemType}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <ListComponent list={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardComponent card={activeDragItemData} isDraggingIn={false} />
          )}
        </DragOverlay>
      </DndContext>
    </BoardLayout>
  )
}
