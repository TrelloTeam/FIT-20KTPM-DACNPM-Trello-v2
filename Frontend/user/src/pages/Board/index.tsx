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
  UniqueIdentifier,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragMoveEvent,
  KeyboardSensor
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { BoardLayout } from '~/layouts'
import { generatePlaceHolderCard } from '~/utils/fomatter'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

export function Board() {
  const [oldListWhenDragging, setOldListWhenDraggingCard] = useState<List>()
  const [listsData, setListsData] = useState<Array<List>>()
  const [activeDragItemId, setActiveDragItemId] = useState<string>('')
  const [activeDragItemType, setActiveDragItemType] = useState<string>('')
  const [activeDragItemData, setActiveDragItemData] = useState<any>()
  const [overListData, setOverListData] = useState<List>()
  // const [cardsData, setCardsData] = useState<Card[]>(cards)
  const [isDragCardToCard, setIsDragCardToCard] = useState<boolean>(false)
  const [isMoveList, setIsMoveList] = useState<boolean>(false)
  const [action, setAction] = useState<boolean>(false)
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  // const mouseSensor = useSensor(MouseSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  // const touchSensor = useSensor(TouchSensor, {
  //   activationConstraint: {
  //     delay: 250,
  //     tolerance: 500
  //   }
  // })
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )
  useEffect(() => {
    console.log('update list')
    const updatedLists_placeHolder = lists.map((list) => ({
      ...list,
      data: list.data.map((task) => ({
        ...task,
        placeHolder: false // Set your default value for placeHolder
      }))
    }))
    const updatedLists = updatedLists_placeHolder.map((list) => {
      // Check if data array is empty
      if (list.data.length === 0) {
        // Add a new item to data array
        const newItem = generatePlaceHolderCard(list)

        return {
          ...list,
          data: [newItem]
        }
      }

      return list // If data array is not empty, keep it unchanged
    })
    setListsData(updatedLists)
    console.log(listsData)
    // You can call your API update function here
  }, [])

  function findListByCardId(cardId: any) {
    return listsData?.find((list) => list?.data?.map((card) => card.id)?.includes(cardId))
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
      const nextActiveList = nextList?.find((list) => list.id === activeList.id)
      const nextOverList = nextList?.find((list) => list.id === overList.id)

      if (nextActiveList) {
        nextActiveList.data = nextActiveList.data.filter((card) => card.id !== activeDragingCardId)
        if (isEmpty(nextActiveList.data)) {
          nextActiveList.data = [generatePlaceHolderCard(nextActiveList)]
        }
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
          nextOverList.data = nextOverList.data.filter((card) => card.placeHolder === false)
        }
      }
      console.log('nextList = ', nextOverList)
      setOverListData(nextOverList)
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

  function handleDragOver(e: DragMoveEvent) {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }
    console.log('DragOver')
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

          const targetList = nextList?.find((list) => list.id === overList.id)
          if (targetList) {
            targetList.data = newList
          }
          return nextList
        })
        setAction(!action)
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id && listsData) {
        console.log('keo tha')

        const oldIndex = listsData?.findIndex((data) => data.id === active.id)
        const newIndex = listsData?.findIndex((data) => data.id === over.id)
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
    setOverListData(undefined)
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
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragMove={handleDragOver} onDragEnd={handleDragEnd}>
        {listsData && (
          <div className={`w-[100%]`}>
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
          </div>
        )}
      </DndContext>
    </BoardLayout>
  )
}
