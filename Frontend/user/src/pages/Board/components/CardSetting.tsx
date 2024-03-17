import { FaCreditCard } from 'react-icons/fa'
import { MdLabelOutline } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'
import { IoMdCard } from 'react-icons/io'
import { FaRegClock } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { MdOutlineContentCopy } from 'react-icons/md'
import { FiArchive } from 'react-icons/fi'

import { useTheme } from '~/components/Theme/themeContext'

export default function CardSetting() {
  const { colors, darkMode } = useTheme()
  return (
    <div
      className={`absolute left-[102%] z-10 flex w-max cursor-default flex-col items-start justify-center space-y-1 font-semibold`}
    >
      <button
        onClick={() => alert('click')}
        className={`m-0 flex flex-row items-center  rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        <FaCreditCard className={`mr-2`} />
        Open card
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{ backgroundColor: darkMode ? '#1d2125' : '#f5f6fa', color: colors.text }}
      >
        {' '}
        <MdLabelOutline className={`mr-2 rotate-[135deg]`} />
        Edit label
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <IoPersonOutline className={`mr-2`} />
        Change member
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <IoMdCard className={`mr-2`} />
        Change cover
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <FaRegClock className={`mr-2`} />
        Edit date
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <FaArrowRight className={`mr-2`} />
        Move
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <MdOutlineContentCopy className={`mr-2`} />
        Copy
      </button>
      <button
        className={`flex flex-row items-center rounded px-3   py-2 shadow-md   hover:opacity-50`}
        style={{
          backgroundColor: darkMode ? '#1d2125' : '#f5f6fa',
          color: colors.text
        }}
      >
        {' '}
        <FiArchive className={`mr-2`} />
        Archive
      </button>
    </div>
  )
}
