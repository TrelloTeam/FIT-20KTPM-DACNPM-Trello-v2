import { useState, useEffect, lazy, Suspense } from 'react'
import { lists } from './testData/test_data'
import { List, Card } from './type/index'

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  UniqueIdentifier,
  PointerSensor,
  useSensor,
  useSensors,
  DragMoveEvent
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { cloneDeep, isEmpty } from 'lodash'
import { BoardLayout } from '~/layouts'
import { generatePlaceHolderCard } from '~/utils/fomatter'
import LoadingComponent from '~/components/Loading'
import { CardComponent, ListComponent } from './components'
import { useTheme } from '~/components/Theme/themeContext'
import { getAllListAPI } from '~/api/List'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
// const LazyCardComponent = lazy(() => import('./components/Card'))
// const LazyListComponent = lazy(() => import('./components/List'))
const LazyListsComponent = lazy(() => import('./components/Lists'))
export function Board() {
  // const { colors, darkMode } = useTheme()
  const [oldListWhenDragging, setOldListWhenDraggingCard] = useState<List>()
  const [listsData, setListsData] = useState<Array<List>>()
  const [activeDragItemId, setActiveDragItemId] = useState<string>('')
  const [activeDragItemType, setActiveDragItemType] = useState<string>('')
  const [activeDragItemData, setActiveDragItemData] = useState<any>()
  // const [overListData, setOverListData] = useState<List>()
  // const [cardsData, setCardsData] = useState<Card[]>(cards)

  // const [isDragCardToCard, setIsDragCardToCard] = useState<boolean>(false)
  // const [isMoveList, setIsMoveList] = useState<boolean>(false)
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
  async function getAllList() {
    const res = await getAllListAPI()
    if (res.status === 200) {
      const updatedLists_placeHolder = res.data.map((list: List) => ({
        ...list,
        data: list.cards.map((task) => ({
          ...task,
          placeHolder: false // Set your default value for placeHolder
        }))
      }))
      const updatedLists = updatedLists_placeHolder?.map((list: List) => {
        // Check if data array is empty
        if (list.cards.length === 0) {
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
    }
  }
  useEffect(() => {
    console.log('update list')
    getAllList()

    // You can call your API update function here
  }, [])
  // useEffect(() => {
  //   console.log('update list')

  //   const updatedLists_placeHolder = lists.map((list) => ({
  //     ...list,
  //     data: list.data.map((task) => ({
  //       ...task,
  //       placeHolder: false // Set your default value for placeHolder
  //     }))
  //   }))
  //   const updatedLists = updatedLists_placeHolder.map((list) => {
  //     // Check if data array is empty
  //     if (list.data.length === 0) {
  //       // Add a new item to data array
  //       const newItem = generatePlaceHolderCard(list)

  //       return {
  //         ...list,
  //         data: [newItem]
  //       }
  //     }

  //     return list // If data array is not empty, keep it unchanged
  //   })
  //   setListsData(updatedLists)
  //   console.log(updatedLists)

  //   // You can call your API update function here
  // }, [])

  function findListByCardId(cardId: any) {
    return listsData?.find((list) => list?.cards?.map((card) => card._id)?.includes(cardId))
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
      const overCardIndex = overList?.cards?.findIndex((card) => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overList.cards.length + 1

      const nextList = cloneDeep(prevList)
      const nextActiveList = nextList?.find((list) => list._id === activeList._id)
      const nextOverList = nextList?.find((list) => list._id === overList._id)

      if (nextActiveList) {
        nextActiveList.cards = nextActiveList.cards.filter((card) => card._id !== activeDragingCardId)
        if (isEmpty(nextActiveList.cards)) {
          nextActiveList.cards = [generatePlaceHolderCard(nextActiveList)]
        }
      }
      if (nextOverList) {
        nextOverList.cards = nextOverList.cards.filter((card) => card._id !== activeDragingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          list_id: nextOverList._id
        } as Card
        // Ensure activeDraggingCardData is not undefined before using it
        if (isCard(activeDraggingCardData)) {
          nextOverList.cards.splice(newCardIndex, 0, rebuild_activeDraggingCardData)
          nextOverList.cards = nextOverList.cards.filter((card) => card.placeHolder === false)
        }
      }
      console.log('nextList = ', nextOverList)
      // setOverListData(nextOverList)
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
    if (activeList._id !== overList._id) {
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
      if (oldListWhenDragging._id !== overList._id) {
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
        const oldIndex = oldListWhenDragging.cards.findIndex((data) => data._id === activeDragItemId)
        const newIndex = overList.cards.findIndex((data) => data._id === overCardId)
        const newList = arrayMove(oldListWhenDragging.cards, oldIndex, newIndex)
        setListsData((prevList) => {
          const nextList = cloneDeep(prevList)

          const targetList = nextList?.find((list) => list._id === overList._id)
          if (targetList) {
            targetList.cards = newList
          }
          return nextList
        })
        setAction(!action)
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id && listsData) {
        console.log('keo tha')

        const oldIndex = listsData?.findIndex((data) => data._id === active.id)
        const newIndex = listsData?.findIndex((data) => data._id === over.id)
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
    // setOverListData(undefined)
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
  const [openCardSetting, setOpenCardSetting] = useState<string>('')
  useEffect(() => {
    console.log(openCardSetting)
    if (openCardSetting) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [openCardSetting])

  return (
    <BoardLayout openCardSetting={openCardSetting}>
      <div className={`flex flex-row justify-start`}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {listsData && (
            <div className={`relative z-20 mt-[64px] w-[100%]`}>
              <Suspense fallback={<LoadingComponent />}>
                <LazyListsComponent lists={listsData} setOpenCardSetting={setOpenCardSetting} />
              </Suspense>
              <DragOverlay dropAnimation={customDropAnimation}>
                {!activeDragItemId || !activeDragItemType}
                {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                  <ListComponent list={activeDragItemData} setOpenCardSetting={(data) => setOpenCardSetting(data)} />
                )}
                {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                  <CardComponent card={activeDragItemData} setOpenCardSetting={(data) => setOpenCardSetting(data)} />
                )}
              </DragOverlay>
            </div>
          )}
        </DndContext>
      </div>
    </BoardLayout>
  )
}
