import { useTheme } from '~/components/Theme/themeContext'
import { ListsComponentProps } from '../type'
import { ListComponent } from './index'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

export default function ListsComponent({ lists, setOpenCardSetting }: ListsComponentProps) {
  const { colors, darkMode } = useTheme()
  const [showAddListForm, setShowAddListForm] = useState(false)
  const [newListName, setNewListName] = useState<string>('')
  const handleAddListClick = () => {
    setShowAddListForm(true)
  }

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
      <div className=' relative z-30 my-10 ml-10 flex flex-row'>
        {lists.map((list) => (
          <ListComponent list={list} setOpenCardSetting={setOpenCardSetting} />

          //     <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
          //       <div className='my-10 ml-4 flex flex-row '>
          //         {lists.map((list) => (
          //           <ListComponent list={list} listDraggingIn={listDraggingIn} />
          // >>>>>>> origin/dev/fe
        ))}
        {showAddListForm ? (
          // Render the form when showAddListForm is true
          <div
            style={{
              backgroundColor: darkMode ? 'black' : '#f1f2f6',
              color: darkMode ? '#d2dae2' : '#2f3542'
            }}
            className={`mr-2 flex h-[100px] min-h-full w-[300px]  flex-col rounded-xl border p-3 shadow-sm`}
          >
            {/* Implement your form with input fields here */}
            <input
              type='text'
              value={newListName}
              placeholder='Enter list title...'
              onChange={(e) => setNewListName(e.target.value)}
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
              className={` h-full w-full placeholder-[${colors.text}] placeholder rounded-sm px-2 py-1 text-left focus:border-0 focus:outline-none focus:ring focus:ring-blue-400 `}
              autoFocus
            />
            <div className={`mt-3 flex flex-row space-x-2`}>
              <button
                className=' rounded   bg-blue-600 px-3 py-2 hover:bg-blue-700'
                onClick={() => {
                  handleSaveListClick()
                }}
              >
                <p className={`text-left font-semibold text-white`}> Add card</p>
              </button>
              <button
                className={` rounded-lg px-3 py-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                onClick={() => {
                  setShowAddListForm(false)
                  setNewListName('')
                }}
              >
                <p className={`text-left font-semibold`}>
                  {' '}
                  <IoMdClose className={``} size={'20px'} />
                </p>
              </button>
            </div>
          </div>
        ) : (
          // Render the button when showAddListForm is false
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
