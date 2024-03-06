import { ListsComponentProps } from '../type'
import { ListComponent } from './index'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export function ListsComponent({ lists, listDraggingIn }: ListsComponentProps) {
  return (
    <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
      <div className='my-10 ml-4 flex flex-row '>
        {lists.map((list) => (
          <ListComponent list={list} listDraggingIn={listDraggingIn} />
        ))}
      </div>
    </SortableContext>
  )
}