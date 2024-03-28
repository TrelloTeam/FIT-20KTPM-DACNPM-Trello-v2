import { useSortable } from '@dnd-kit/sortable'
import { CardComponentProps } from '../type'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import CardSetting from './CardSetting'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useTheme } from '~/components/Theme/themeContext'
import randomColor from 'randomcolor'
import { CardApiRTQ } from '~/api'
export default function CardComponent({ card, cardSelected, setOpenCardSetting }: CardComponentProps) {
  const { colors, darkMode } = useTheme()
  const [bgColorEmailWatcher, setBgColorEmailWatcher] = useState<Array<string>>([])
  const [updateCard] = CardApiRTQ.CardApiSlice.useUpdateCardMutation()
  useEffect(() => {
    const bgColorCode = []
    for (let i = 0; i < card.watcher_email.length; i++) {
      const randomBgColor = randomColor({ luminosity: 'dark' })
      bgColorCode.push(randomBgColor)
    }
    setBgColorEmailWatcher(bgColorCode)
  }, [])

  const { attributes, transition, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
    animateLayoutChanges: () => false
  })
  const styleList = {
    transform: CSS.Translate.toString(transform),
    // height: '100%',
    transition,
    opacity: isDragging ? 0.5 : undefined
    // border: isDragging ? 0.5 : undefined
  }
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered_SaveBtn, setIsHovered_SaveBtn] = useState(false)
  const [cardSettingOpen, setCardSettingOpen] = useState<string>('')
  const [isHoveredWatcher, setIsHoveredWatcher] = useState<string>()
  // const [isHoveredTextInput, setIsHoveredTextInput] = useState<boolean>(false)
  // const avtPath = '/src/assets/Profile/avt.png'

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
  const cardRef = useRef<HTMLDivElement>(null)
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
    updateCard({
      cardlist_id: card.list_id,
      card_id: card._id,
      name: 'string',
      cover: card.cover
    }).then(() => {
      alert('edit successful')
      setIsHovered_SaveBtn(false)
      setIsHovered(false)
      setCardSettingOpen('')
      setOpenCardSetting('')
    })
    // .catch((err) => {
    //   alert(err)
    //   console.log(err)
    // })
  }
  return (
    <div>
      <div>
        {!cardSettingOpen && (
          <div ref={setNodeRef} style={styleList} {...attributes} {...listeners}>
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
              onClick={() => alert('click card')}
            >
              <div className={`flex flex-row items-center justify-between`}>
                <p className={` text-left`}>{card.name}</p>
                {isHovered && (
                  <BsPencil
                    className=''
                    onClick={(e) => {
                      e.stopPropagation() // Prevent click event from bubbling up
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
          <div className={` pointer-events-auto relative `}>
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
            <div ref={componentRef} className={`flex flex-col`}>
              <div
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  zIndex: 10
                }}
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
                className={`absolute top-full ml-3 mt-2 w-[65px] rounded-md py-2`}
                onClick={() => {
                  alert('save')
                  editCardName()
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
