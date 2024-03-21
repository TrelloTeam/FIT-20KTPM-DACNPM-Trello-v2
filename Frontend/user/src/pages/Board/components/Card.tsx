import randomColor from 'randomcolor'
import { useEffect, useRef, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useTheme } from '~/components/Theme/themeContext'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { CardComponentProps } from '../type'
import CardSetting from './CardSetting'

export default function CardComponent({ card, setOpenCardSetting }: CardComponentProps) {
  const { colors, darkMode } = useTheme()
  const [bgColorEmailWatcher, setBgColorEmailWatcher] = useState<Array<string>>([])
  useEffect(() => {
    const bgColorCode = []
    for (let i = 0; i < card.watcher_email.length; i++) {
      const randomBgColor = randomColor({ luminosity: 'dark' })
      bgColorCode.push(randomBgColor)
    }
    setBgColorEmailWatcher(bgColorCode)
  }, [])

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const styleList = {
    transform: CSS.Transform.toString(transform),
    // height: '100%',
    opacity: isDragging ? 0.5 : undefined
    // border: isDragging ? 0.5 : undefined
  }
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered_SaveBtn, setIsHovered_SaveBtn] = useState(false)
  const [cardSettingOpen, setCardSettingOpen] = useState<string>('')
  const [isHoveredWatcher, setIsHoveredWatcher] = useState<string>()
  // const [isHoveredTextInput, setIsHoveredTextInput] = useState<boolean>(false)
  // const avtPath = '/src/assets/Profile/avt.png'

  let hoverTimeout: number | undefined
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
        setIsHovered(false)
        setCardSettingOpen('')
        setOpenCardSetting('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  function editCardName() {
    setIsHovered_SaveBtn(false)
    setCardSettingOpen('')
  }
  return (
    <>
      {!cardSettingOpen && (
        <div id={card._id} ref={setNodeRef} style={styleList} {...attributes} {...listeners} className='transition-all'>
          <div
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              border: '1px solid',
              borderColor: isHovered ? colors.card_border : colors.background
            }}
            className={`mx-3  space-y-2 rounded-lg  p-2  ${darkMode ? `` : ' shadow-sm shadow-gray-300'} ${card.placeHolder ? 'invisible -mt-3 max-h-0  border-0 p-0' : 'visible'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex flex-row items-center justify-between`}>
              <p className={` text-left`}>{card.name}</p>
              {isHovered && (
                <BsPencil
                  className=''
                  onClick={() => {
                    setCardSettingOpen(card._id)
                    setOpenCardSetting(card._id)
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
                  <div key={index} className={`relative z-10 flex flex-row items-center justify-center`}>
                    <div onMouseEnter={() => handleMouseOver(watcher)} onMouseLeave={handleMouseLeave}>
                      <div
                        style={{ backgroundColor: bgColorEmailWatcher[index] }}
                        className={`mx-1 h-[22px] w-[23px] rounded-full pt-[3px] text-center  text-[10px]  font-semibold text-white hover:opacity-50`}
                      >
                        HM
                      </div>
                      {isHoveredWatcher && isHoveredWatcher === watcher && (
                        <div className='absolute -bottom-10 left-2 z-20 ml-6 bg-yellow-200 p-1 text-black hover:bg-gray-100'>
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
      {cardSettingOpen && cardSettingOpen === card._id && (
        <div className={` pointer-events-auto `}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black color
              zIndex: 10 // Ensure it's above other content
            }}
          ></div>
          <div
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              zIndex: 10
            }}
            ref={componentRef}
            className={`relative mx-3  ${darkMode ? `` : ' shadow-sm shadow-gray-300'} flex rounded-lg`}
          >
            <div
              className={` w-full space-y-2 rounded-lg   p-2  ${card.placeHolder ? 'invisible m-0 h-0 border-0 p-0' : 'visible'}`}
              // onMouseEnter={() => setIsHoveredTextInput(true)}
              // onMouseLeave={() => setIsHoveredTextInput(false)}
            >
              <div className={`flex flex-row items-center   justify-between`}>
                <input
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                  className={` w-full border-0 px-2 pb-7 text-left focus:border-0 focus:outline-none  `}
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
                        <div
                          style={{ backgroundColor: bgColorEmailWatcher[index] }}
                          className={`mx-1 h-[22px] w-[23px] rounded-full pt-[3px] text-center  text-[10px]  font-semibold text-white hover:opacity-50`}
                        >
                          HM
                        </div>
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
          <button
            style={{
              backgroundColor: !isHovered_SaveBtn ? colors.save_card : colors.save_card_hover,
              color: darkMode ? 'black' : 'white',
              zIndex: 10
            }}
            onMouseEnter={() => setIsHovered_SaveBtn(true)}
            onMouseLeave={() => setIsHovered_SaveBtn(false)}
            className={`absolute ml-3 mt-2 rounded-md py-2`}
            onClick={() => {
              editCardName()
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  )
}
