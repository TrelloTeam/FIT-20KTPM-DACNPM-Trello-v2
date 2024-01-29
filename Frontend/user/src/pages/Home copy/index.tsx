import { useState, useEffect, DragEvent } from 'react'
import { lists, cards } from './testData/test_data'

interface Card {
  id: number
  list_id: number
  order: number
  name: string
  list_name: string
}

interface List {
  id: number
  board_id: number
  order: number
  name: string
  data: Card[]
}

export function Board() {
  const [listsData, setListsData] = useState<List[]>(lists)
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

  function handleListOnDrag(e: DragEvent, list: List) {
    e.dataTransfer.setData('list', JSON.stringify(list))
  }

  function handleListOnDrop(e: DragEvent, targetList: List) {
    const draggedListString = e.dataTransfer.getData('list')
    const draggedCardString = e.dataTransfer.getData('card')

    if (draggedListString && !draggedCardString) {
      const draggedList = JSON.parse(draggedListString)
      console.log('fromList ', draggedList)
      console.log('toList ', targetList)

      if (draggedList) {
        const targetRect = e.currentTarget.getBoundingClientRect()
        const dropPosition = e.clientX - targetRect.left
        const dropLeft = dropPosition < targetRect.width / 2

        moveList(draggedList, targetList, dropLeft)
        setAction(!action)
      }
    }
  }

  function handleOnDrag(e: DragEvent, card: Card) {
    e.dataTransfer.setData('card', JSON.stringify(card))
  }

  function handleOnDrop(e: DragEvent, targetList: List, targetCard?: Card) {
    const draggedCardString = e.dataTransfer.getData('card')
    const draggedCard = JSON.parse(draggedCardString)

    if (draggedCard) {
      if (targetCard) {
        const targetRect = e.currentTarget.getBoundingClientRect()
        const dropPosition = e.clientY - targetRect.top
        const dropAbove = dropPosition < targetRect.height / 2
        console.log('from Card', draggedCard)
        console.log('to List', targetList)
        console.log('to Card', targetCard)
        moveCard(draggedCard, targetList, targetCard, dropAbove)
        setAction(!action)
      } else {
        console.log('fromCard ', draggedCard)
        console.log('toList ', targetList)
        // Move card to the end of the list
        moveCard(draggedCard, targetList)
        setAction(!action)
      }
    }
  }

  function handleDragOverList(e: DragEvent) {
    e.preventDefault()
    setIsMoveList(true)
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    // Add logic to detect if you are dragging over a gap between two cards
    // You can use this information to trigger the desired behavior
    setIsDragCardToCard(true)
    setIsMoveList(false)
  }

  return (
    <div
      onDragEnd={() => {
        setIsDragCardToCard(false)
        setIsMoveList(false)
      }}
    >
      <div className='mx-auto p-4 text-center text-3xl font-bold uppercase text-black'>Trello Board</div>
      <div className='mx-auto my-10 flex flex-row justify-center text-center'>
        {listsData.map((list) => (
          <div
            key={list.id}
            className='relative mr-10 h-full rounded-lg border p-5'
            onDragStart={(e) => handleListOnDrag(e, list)}
            onDrop={(e) => handleListOnDrop(e, list)}
            onDragOver={handleDragOverList}
            draggable
          >
            <h2 className='mb-5 font-bold hover:cursor-grab'>{list.name}</h2>

            {cards.map((card, index) => (
              <>
                {card.list_id === list.id && (
                  <>
                    <div
                      key={card.id}
                      className='m-5 rounded-lg border p-2 text-center'
                      onDragStart={(e) => handleOnDrag(e, card)}
                      onDrop={(e) => handleOnDrop(e, list, card)}
                      onDragOver={handleDragOver}
                      draggable
                    >
                      <p>{card.order + '-' + card.name}</p>
                    </div>
                  </>
                )}
              </>
            ))}
            {isDragCardToCard && (
              <div
                className='w-full rounded-lg border-4 border-dashed p-2'
                onDrop={(e) => {
                  handleOnDrop(e, list)
                }}
                onDragOver={handleDragOver}
              >
                +
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
