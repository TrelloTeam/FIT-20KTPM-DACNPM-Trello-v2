import { ListsComponentProps } from '../type'
import { ListComponent } from './index'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export default function ListsComponent({ lists }: ListsComponentProps) {
  return (

    <SortableContext items={lists?.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
      <div className='my-10 ml-10 flex flex-row '>
        {lists.map((list) => (
          <ListComponent list={list} />

//     <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
//       <div className='my-10 ml-4 flex flex-row '>
//         {lists.map((list) => (
//           <ListComponent list={list} listDraggingIn={listDraggingIn} />
// >>>>>>> origin/dev/fe
        ))}
      </div>
    </SortableContext>
  )
}
