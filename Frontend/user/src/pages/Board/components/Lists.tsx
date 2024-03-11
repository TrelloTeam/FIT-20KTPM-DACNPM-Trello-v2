import { ListsComponentProps } from '../type'
import { ListComponent } from './index'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

export default function ListsComponent({ lists, setOpenCardSetting }: ListsComponentProps) {
  return (
    <SortableContext items={lists?.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
      <div className='mt-[64px] flex flex-row items-start p-4'>
        {lists.map((list) => (
          <ListComponent list={list} setOpenCardSetting={setOpenCardSetting} />

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
