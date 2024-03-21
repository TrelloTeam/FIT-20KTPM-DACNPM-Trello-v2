import { useTheme } from '~/components/Theme/themeContext'
import { ListsComponentProps } from '../type'
import { ListComponent } from './index'
import AddListForm from './AddNewList'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { CardlistApiRTQ } from '~/api'

export default function ListsComponent({ lists, setOpenCardSetting }: ListsComponentProps) {
  const [getAllCardlist, { data: cardlistData }] = CardlistApiRTQ.CardListApiSlice.useLazyGetAllCardlistQuery()
  const [createCardlist] = CardlistApiRTQ.CardListApiSlice.useCreateCardlistMutation()
  const { colors, darkMode } = useTheme()
  const [showAddListForm, setShowAddListForm] = useState(false)
  const [newListName, setNewListName] = useState<string>('')
  const handleAddListClick = () => {
    setShowAddListForm(true)
  }
  const listFormRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (listFormRef.current && !listFormRef.current.contains(event.target as Node)) {
      // Clicked outside of ListForm, turn back to the button
      setShowAddListForm(false)
      setNewListName('')
    }
  }

  useEffect(() => {
    if (!cardlistData) getAllCardlist()
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleSaveListClick = () => {
    // Implement your logic to save the new list
    createList()
    setShowAddListForm(false)
    setNewListName('')
  }
  async function createList() {
    createCardlist({
      name: newListName,
      board_id: 'demo_board',
      index: cardlistData?.data.length || 0
    }).then(() => getAllCardlist())
    // const res = await createListAPI(data)
    // console.log(res)
  }
  return (
    <SortableContext
      items={lists?.map((l) => l._id) as (UniqueIdentifier | { id: UniqueIdentifier })[]}
      strategy={horizontalListSortingStrategy}
    >
      <div className='relative flex flex-row items-start p-4'>
        {lists?.map((list) => <ListComponent list={list} setOpenCardSetting={setOpenCardSetting} key={list._id} />)}
        {showAddListForm ? (
          <div ref={listFormRef} className={`h-[120px]`}>
            <AddListForm
              darkMode={darkMode}
              colors={colors}
              newListName={newListName}
              setShowAddListForm={setShowAddListForm}
              setNewListName={setNewListName}
              handleSaveListClick={handleSaveListClick}
            />
          </div>
        ) : (
          <button
            className={`h-fit w-[300px]   rounded-xl border bg-black bg-opacity-20 p-3 text-left font-semibold text-white`}
            onClick={handleAddListClick}
          >
            + Add another list
          </button>
        )}
      </div>
    </SortableContext>
  )
}
