import { CardComponent } from '.'
import { ListComponentProps } from '../type'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
export function ListComponent({ list }: ListComponentProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: list.id,
    data: { ...list }
  })

  const styleList = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined
  }
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
      <div className='relative mr-10 h-full rounded-lg border p-5'>
        <h2 className='mb-5 font-bold hover:cursor-grab'>{list.name}</h2>
        <SortableContext items={list.data} strategy={verticalListSortingStrategy}>
          {list.data.map((card, index) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
