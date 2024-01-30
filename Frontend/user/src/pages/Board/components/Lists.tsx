import { List, ListsComponentProps } from '../type'
import { ListComponent } from './index'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export function ListsComponent({ lists }: ListsComponentProps) {
  return (
    <SortableContext items={lists.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
      <div className='mx-auto my-10 flex flex-row justify-center text-center'>
        {lists.map((list) => (
          <ListComponent list={list} />
        ))}
      </div>
    </SortableContext>
  )
}
