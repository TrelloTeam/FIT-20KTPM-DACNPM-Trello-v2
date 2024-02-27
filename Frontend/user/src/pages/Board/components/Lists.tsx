import { ListsComponentProps } from '../type'
import { ListComponent } from './index'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const array = [1, 2, 3, 4, 5]
const a = 1
export default function ListsComponent({ lists }: ListsComponentProps) {
  return (
    <SortableContext items={lists?.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
      <div className='my-10 ml-10 flex flex-row '>
        {lists.map((list) => (
          <ListComponent list={list} />
        ))}
      </div>
    </SortableContext>
  )
}
