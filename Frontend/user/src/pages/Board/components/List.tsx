import { CardComponent, ListSetting } from '.'
import { ListComponentProps } from '../type'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useEffect, useRef, useState } from 'react'
// import { useEffect, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { IoImagesOutline } from 'react-icons/io5'
import { useTheme } from '~/components/Theme/themeContext'
export default function ListComponent({ list, setOpenCardSetting }: ListComponentProps) {
  const { colors, darkMode } = useTheme()

  const [listSettingOpen, setListSettingOpen] = useState<string>()
  const [addCardOpenAt, setAddCardOpenAt] = useState<string>('')

  const componentRef_AddCard = useRef<HTMLDivElement>(null)
  const componentRef_ListSetting = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside_AddCard = (event: MouseEvent) => {
      if (componentRef_AddCard.current && !componentRef_AddCard.current.contains(event.target as Node)) {
        // Clicked outside of Component A, hide it
        setAddCardOpenAt('')
      }
    }
    const handleClickOutside_ListSetting = (event: MouseEvent) => {
      if (componentRef_ListSetting.current && !componentRef_ListSetting.current.contains(event.target as Node)) {
        // Clicked outside of Component A, hide it
        setListSettingOpen('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside_AddCard)
    document.addEventListener('mousedown', handleClickOutside_ListSetting)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside_AddCard)
      document.removeEventListener('mousedown', handleClickOutside_ListSetting)
    }
  }, [])

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: list.id,
    data: { ...list }
  })

  const styleList = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    backgroundColor: darkMode ? 'black' : '#f1f2f6',
    color: colors.text
  }

  return (
    <div
      ref={setNodeRef}
      style={styleList}
      {...attributes}
      {...listeners}
      className='mr-2 flex min-h-full  w-[300px] flex-col rounded-xl border shadow-sm '
    >
      <div className=' relative mx-6 my-4 flex flex-row items-center justify-between'>
        <h2 className={`font-bold  `}>{list.name}</h2>
        <HiOutlineDotsHorizontal
          size={'20px'}
          className={` absolute top-50 right-0 text-black rounded-lg  ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
          onClick={() => setListSettingOpen(list.id)}
        />
        {listSettingOpen && listSettingOpen === list.id && (
          <div ref={componentRef_ListSetting}>
            <ListSetting closeListSetting={() => setListSettingOpen('')} />
          </div>
        )}
      </div>
      <div className={` relative`}>
        <SortableContext items={list.data.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {list.data &&
            list.data.map((card, index) => (
              <CardComponent key={index} card={card} setOpenCardSetting={setOpenCardSetting} />
            ))}
        </SortableContext>
        {addCardOpenAt &&
          addCardOpenAt === list.id &&
          (list.data[0].placeHolder === false ? (
            <div ref={componentRef_AddCard} className='mx-3 '>
              <div className={` mt-2 rounded-xl  `}>
                <div className={`flex flex-row items-center   justify-between`}>
                  <input
                    style={{
                      backgroundColor: colors.background,
                      color: colors.text
                    }}
                    className={` h-full w-full rounded-lg px-2 pb-8 text-left focus:border-0 focus:outline-none focus:ring-0 `}
                    placeholder='Enter the title for this card...'
                    autoFocus
                  ></input>
                </div>
              </div>
              <div className={`my-2 flex flex-row space-x-2`}>
                <button
                  className=' rounded   bg-blue-600 px-3 py-2 hover:bg-blue-700'
                  onClick={() => setAddCardOpenAt(list.id)}
                >
                  <p className={`text-left font-semibold text-white`}> Add card</p>
                </button>
                <button
                  className={` rounded-lg px-3 py-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                  onClick={() => setAddCardOpenAt('')}
                >
                  <p className={`text-left font-semibold`}>  <IoMdClose className={``} size={'20px'}/> </p>
                </button>
              </div>
            </div>
          ) : (
            <div ref={componentRef_AddCard} className='absolute top-0 w-full m-3 pr-7'>
              <div className={` space-y-2 rounded-xl  `}>
                <div className={`flex flex-row items-center   justify-between`}>
                  <input
                    style={{
                      backgroundColor: colors.background,
                      color: colors.text
                    }}
                    className={` h-full w-full rounded-lg px-2 pb-8 text-left focus:border-0 focus:outline-none focus:ring-0 `}
                    placeholder='Enter the title for this card...'
                    autoFocus
                  ></input>
                </div>
              </div>
              <div className={`my-2 flex flex-row space-x-2`}>
                <button
                  className=' rounded   bg-blue-600 px-3 py-2 hover:bg-blue-700'
                  onClick={() => setAddCardOpenAt(list.id)}
                >
                  <p className={`text-left font-semibold text-white`}> Add card</p>
                </button>
                <button
                  className={` rounded-lg px-3 py-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                  onClick={() => setAddCardOpenAt('')}
                >
                  <p className={`text-left font-semibold `}>  <IoMdClose className={``} size={'20px'}/> </p>
                </button>
              </div>
            </div>
          ))}
      </div>
      {!addCardOpenAt && (
        <div className={`my-2 mx-3 flex flex-row space-x-2`}>
          <button
            className={`w-10/12 rounded-lg p-2 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
            onClick={() => {
              setAddCardOpenAt(list.id)
            }}
          >
            <p className={`text-left font-semibold `}>+ Add a card</p>
          </button>
          <button
            className={` content-center rounded-lg p-2 text-center  ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
          >
            <IoImagesOutline className={`text-center`} />
          </button>
        </div>
      )}
    </div>
  )
}
