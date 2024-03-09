import { useSortable } from '@dnd-kit/sortable'
import { CardComponentProps } from '../type'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import CardSetting from './CardSetting'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useTheme } from '~/components/Theme/themeContext'
export default function CardComponent({ card, setOpenCardSetting }: CardComponentProps) {
  const { colors, darkMode } = useTheme()

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: card.id,
    data: { ...card }
  })
  const styleList = {
    transform: CSS.Transform.toString(transform),
    height: card.placeHolder === true ? '100%' : '',
    opacity: isDragging ? 0.5 : undefined
    // border: isDragging ? 0.5 : undefined
  }
  const [isHovered, setIsHovered] = useState(false)
  const [cardSettingOpen, setCardSettingOpen] = useState<string>('')
  const [isHoveredWatcher, setIsHoveredWatcher] = useState<string>()
  const [isHoveredTextInput, setIsHoveredTextInput] = useState<boolean>(false)
  const avtPath = '/src/assets/Profile/avt.png'

  let hoverTimeout: NodeJS.Timeout | undefined
  const handleMouseOver = (watcher: string) => {
    hoverTimeout = setTimeout(() => {
      setIsHoveredWatcher(watcher)
    }, 1) // Set the delay to 1000 milliseconds (1 second)
  }
  // useEffect(() => {
  //   if (cardSettingOpen) {
  //     document.body.classList.add('overlay-hidden')
  //   } else {
  //     document.body.classList.remove('overlay-hidden')
  //   }
  // }, [cardSettingOpen])
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout)
    setIsHoveredWatcher('')
  }
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        // Clicked outside of Component A, hide it
        setCardSettingOpen('')
        setOpenCardSetting('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <>
      {!cardSettingOpen && (
        <div ref={setNodeRef} style={styleList} {...attributes} {...listeners} className='transition-all'>
          <div
            style={{
              backgroundColor: darkMode ? '#2c3e50' : 'white',
              color: darkMode ? '#d2dae2' : '#2f3542'
            }}
            className={`m-3 space-y-2 rounded-xl p-2  shadow-sm shadow-gray-400 hover:border-[3px] hover:border-blue-400 ${card.placeHolder ? 'invisible' : 'visible'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex flex-row items-center justify-between`}>
              <p className={` text-left`}>{card.name}</p>
              {isHovered && (
                <BsPencil
                  className=''
                  onClick={() => {
                    setCardSettingOpen(card.id)
                    setOpenCardSetting(card.id)
                  }}
                />
              )}
            </div>
            {card.watcher_email && card.watcher_email.length > 0 && (
              <div className={`flex flex-row items-center justify-between`}>
                <div className='flex-grow'>
                  <MdOutlineRemoveRedEye className={`ml-2`} />
                </div>
                {card.watcher_email.map((watcher, index) => (
                  <div key={index} className={`relative z-10 flex flex-row items-center justify-between`}>
                    <div onMouseEnter={() => handleMouseOver(watcher)} onMouseLeave={handleMouseLeave}>
                      <img src={avtPath} alt='Avatar' className='mx-1 h-6 w-6 rounded-full border hover:opacity-50' />
                      {isHoveredWatcher && isHoveredWatcher === watcher && (
                        <div className='absolute -bottom-10 left-2 z-20 ml-6 bg-yellow-200 p-1 hover:bg-gray-100'>
                          {watcher}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {cardSettingOpen && cardSettingOpen === card.id && (
        <div className={`pointer-events-auto `}>
          <div
            style={{
              backgroundColor: darkMode ? '#2c3e50' : 'white',
              color: darkMode ? '#d2dae2' : '#2f3542'
            }}
            ref={componentRef}
            className={`relative m-2 flex `}
          >
            <div
              className={` w-full space-y-2 rounded-xl border  p-2  ${card.placeHolder ? 'invisible' : 'visible'}`}
              onMouseEnter={() => setIsHoveredTextInput(true)}
              onMouseLeave={() => setIsHoveredTextInput(false)}
            >
              <div className={`flex flex-row items-center   justify-between`}>
                <input
                  style={{
                    backgroundColor: darkMode ? '#2c3e50' : 'white',
                    color: darkMode ? '#d2dae2' : '#2f3542'
                  }}
                  className={` focus: w-full border-0 px-2 text-left focus:outline-none  `}
                  autoFocus
                ></input>
              </div>
              {card.watcher_email && card.watcher_email.length > 0 && (
                <div className={`flex flex-row items-center justify-between`}>
                  <div className='flex-grow'>
                    <MdOutlineRemoveRedEye className={`ml-2`} />
                  </div>
                  {card.watcher_email.map((watcher, index) => (
                    <div key={index} className={` flex flex-row items-center justify-between`}>
                      <div onMouseOver={() => handleMouseOver(watcher)} onMouseLeave={handleMouseLeave}>
                        <img src={avtPath} alt='Avatar' className='mx-1 h-6 w-6 rounded-full border hover:opacity-50' />
                        {isHoveredWatcher && isHoveredWatcher === watcher && (
                          <div className='absolute -bottom-10 right-0 z-20 ml-6 bg-yellow-100 p-1 hover:bg-gray-100'>
                            {watcher}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <CardSetting />
          </div>
          <button className={`absolute ml-2 rounded-md bg-blue-500 text-white`}>Save</button>
        </div>
      )}
    </>
  )
}
