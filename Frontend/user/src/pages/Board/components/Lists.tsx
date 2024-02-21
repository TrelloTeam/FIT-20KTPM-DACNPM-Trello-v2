import { List, ListsComponentProps } from '../type'
import { ListComponent } from './index'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export function ListsComponent({ lists }: ListsComponentProps) {
  return (
    <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
      <div className='ml-4 my-10 flex flex-row '>
        {lists.map((list) => (
          <ListComponent list={list} />
        ))}
      </div>
    </SortableContext>
  )
}
