import { useSortable } from '@dnd-kit/sortable'
import { CardComponentProps, Card } from '../type'
import { CSS } from '@dnd-kit/utilities'

export function CardComponent({ card }: CardComponentProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { ...card }
  })

  const styleList = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    // border: isDragging ? 0.5 : undefined
  }
  return (
    <>
      <div
        ref={setNodeRef}
        style={styleList}
        {...attributes}
        {...listeners}
        className='m-5 rounded-lg border p-2 text-center'
        // onDragStart={(e) => handleOnDrag(e)}
        // onDrop={(e) => handleOnDrop(e)}
        // onDragOver={handleDragOver}
      >
        <p>{card.order + '-' + card.name}</p>
      </div>
    </>
  )
}
