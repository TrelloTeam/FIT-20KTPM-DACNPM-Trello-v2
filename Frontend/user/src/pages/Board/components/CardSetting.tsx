import { FaCreditCard } from 'react-icons/fa'
import { MdLabelOutline } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'
import { IoMdCard } from 'react-icons/io'
import { FaRegClock } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { MdOutlineContentCopy } from 'react-icons/md'
import { FiArchive } from 'react-icons/fi'

export default function CardSetting() {
  return (
    <div
      className={`absolute left-[102%] z-50 flex w-max cursor-default flex-col items-start justify-center space-y-1`}
    >
      <button
        onClick={() => alert('click')}
        className={`m-0 flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}
      >
        <FaCreditCard className={`mr-2`} />
        Open card
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <MdLabelOutline className={`mr-2 rotate-[135deg]`} />
        Edit label
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <IoPersonOutline className={`mr-2`} />
        Change member
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <IoMdCard className={`mr-2`} />
        Change cover
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <FaRegClock className={`mr-2`} />
        Edit date
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <FaArrowRight className={`mr-2`} />
        Move
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <MdOutlineContentCopy className={`mr-2`} />
        Copy
      </button>
      <button className={`flex flex-row items-center rounded bg-gray-700 px-3 py-2 text-white hover:opacity-50`}>
        {' '}
        <FiArchive className={`mr-2`} />
        Archive
      </button>
    </div>
  )
}
