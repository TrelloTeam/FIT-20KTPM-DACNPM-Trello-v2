import { useSortable } from '@dnd-kit/sortable'
import { CardComponentProps } from '../type'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { BsPencil } from 'react-icons/bs'

export default function CardComponent({ card }: CardComponentProps) {
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
  const [isHoveredWatcher, setIsHoveredWatcher] = useState<string>()
  const avtPath = '/src/assets/Profile/avt.png'
  return (
    <div ref={setNodeRef} style={styleList} {...attributes} {...listeners} className='transition-all'>
      <div
        className={`m-2 space-y-2 rounded-xl border bg-white p-2 hover:bg-gray-200 ${card.placeHolder ? 'invisible' : 'visible'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex flex-row items-center justify-between`}>
          <p className={` text-left text-gray-700`}>{card.name}</p>
          {isHovered && <BsPencil className='' />}
        </div>
        {card.watcher_email && card.watcher_email.length > 0 && (
          <div className={`flex flex-row items-center justify-between`}>
            <div className='flex-grow'>{/* Content of item1 goes here */}</div>
            {card.watcher_email.map((watcher, index) => (
              <div key={index} className={`relative flex flex-row items-center justify-between`}>
                <img
                  src={avtPath} // Replace with your avatar image source
                  alt='Avatar'
                  className='relative h-6 w-6 rounded-full border hover:opacity-50'
                  onMouseEnter={() => setIsHoveredWatcher(watcher)}
                  onMouseLeave={() => setIsHoveredWatcher('')}
                />
                {isHoveredWatcher && isHoveredWatcher === watcher && (
                  <div className='absolute bottom-0 right-0 bg-gray-200 p-2'>
                    {/* Additional info to display when hovering */}
                    {watcher}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
