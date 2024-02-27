import { CardComponent } from '.'
import { Card, ListComponentProps, defaultCard } from '../type'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoImagesOutline } from 'react-icons/io5'
export function ListComponent({ list, listDraggingIn }: ListComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: list.id,
    data: { ...list }
  })

  const styleList = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined
  }
  const [tempCard, setTempCard] = useState<Card>()
  useEffect(() => {
    setTempCard({
      ...defaultCard,
      id: 'uniqueId123',
      list_id: listDraggingIn?.id
    } as Card)
  }, [listDraggingIn])
  return (
    <div
      ref={setNodeRef}
      style={styleList}
      {...attributes}
      {...listeners}
      // onDragStart={(e) => handleListOnDrag(e, list)}
      // onDrop={(e) => handleListOnDrop(e, list)}
      // onDragOver={handleDragOverList}
    >
      <div className='relative mr-2  w-[280px] rounded-lg border bg-gray-100 shadow-sm'>
        <div className='mx-6 my-4 flex flex-row items-center justify-between'>
          <h2 className={`font-bold text-gray-600 `}>{list.name}</h2>
          <HiOutlineDotsHorizontal className={`rounded-full  hover:bg-gray-300`} />
        </div>
        <SortableContext items={list.data} strategy={verticalListSortingStrategy}>
          {list.data &&
            list.data.length > 0 &&
            list.data.map((card, index) => <CardComponent key={index} card={card} listDraggingIn={listDraggingIn} />)}
          {list.data && list.data.length === 0 && <CardComponent card={tempCard} listDraggingIn={listDraggingIn} />}
        </SortableContext>
        <div className={`m-2 flex flex-row space-x-2`}>
          <button className='w-10/12 rounded-lg p-2 hover:bg-gray-200'>
            <p className={`text-left font-semibold text-gray-600`}>+ Add a card</p>
          </button>
          <button className=' content-center rounded-lg p-2 text-center text-gray-600 hover:bg-gray-200'>
            <IoImagesOutline className={`text-center`} />
          </button>
        </div>
      </div>
    </div>
  )
}
