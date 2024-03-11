import { useTheme } from '~/components/Theme/themeContext'
import { ListsComponentProps } from '../type'
import { ListComponent } from './index'
import AddListForm from './AddNewList'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

export default function ListsComponent({ lists, setOpenCardSetting }: ListsComponentProps) {
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
    const data = {
      board_id: '65ef085bfe5fa8ccefce5ea3',
      index: 1,
      name: newListName,
      archive_at: undefined
    }
    // const res = await createListAPI(data)
    // console.log(res)
  }
  return (
    <SortableContext items={lists?.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
      <div className='relative z-30 my-10 ml-10 flex flex-row'>
        {lists.map((list) => (
          <ListComponent list={list} setOpenCardSetting={setOpenCardSetting} key={list.id} />
        ))}
        {showAddListForm ? (
          <div
          ref={listFormRef}
          className={`h-[120px]`}
          >
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
