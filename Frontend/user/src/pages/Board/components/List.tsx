import { CardComponent } from '.'
import { ListComponentProps } from '../type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
export function ListComponent({ list }: ListComponentProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: list.id,
    data: { ...list }
  })

  const styleList = {
    transform: CSS.Translate.toString(transform),
    transition
  }
  return (
    <div
      ref={setNodeRef}
      style={styleList}
      {...attributes}
      {...listeners}
      className='relative mr-10 h-full rounded-lg border p-5'
      // onDragStart={(e) => handleListOnDrag(e, list)}
      // onDrop={(e) => handleListOnDrop(e, list)}
      // onDragOver={handleDragOverList}
    >
      <h2 className='mb-5 font-bold hover:cursor-grab'>{list.name}</h2>

      {list.data.map((card, index) => (
        <CardComponent key={card.id} card={card} />
      ))}
    </div>
  )
}
