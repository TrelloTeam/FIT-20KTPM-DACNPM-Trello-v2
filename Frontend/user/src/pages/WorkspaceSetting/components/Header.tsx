// components/Header.tsx
import React, { useEffect, useState } from 'react'
import { MdOutlineLock } from 'react-icons/md'

import { RxAvatar } from 'react-icons/rx'
import { useTheme } from '~/components/Theme/themeContext'
import { LuPen } from 'react-icons/lu'
export const Header: React.FC = () => {
  const { colors, darkMode } = useTheme()
  const [selectedTab, setSelectedTab] = useState<string>('')
  const [isHoverLogo, setIsHoverLogo] = useState<boolean>(false)

  return (
    <header className={`left-0 mx-14  border-b-2 py-2  ${!darkMode ? 'border-gray-300  ' : 'border-gray-700 '} `}>
      <div className='my-4 flex max-w-2xl items-center space-x-4 pl-[10%]'>
        {/* <img

          src={avtPath} // Replace with your avatar image source
          alt='Avatar'
          className=' h-[65px] w-[65px] rounded-full border'
        /> */}
        {/* <RxAvatar size={`70px`} /> */}
        <div
          onMouseEnter={() => setIsHoverLogo(true)}
          onMouseLeave={() => setIsHoverLogo(false)}
          className={`relative flex h-[65px] w-[65px] items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-purple-500  shadow-sm`}
        >
          <h1 className={`text-4xl font-bold text-white`}>T</h1>
          {isHoverLogo && (
            <div
              style={{
                color: darkMode ? colors.black : colors.white
              }}
              className={`absolute bottom-0 flex h-1/2 w-full items-center justify-center rounded-b-md bg-black ${darkMode ? 'bg-opacity-10' : 'bg-opacity-30'}`}
            >
              <p className={`cursor-pointer font-bold underline`}>Change</p>
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <div className={`inline-flex  items-center`}>
            <h1 className='text-xl font-semibold mr-2'>My Workspace</h1>
            <LuPen size={`22px`} className={`rounded-md cursor-pointer p-1 ${darkMode ? 'hover:bg-gray-700':'hover:bg-gray-300'}`}/>
          </div>
          <div className={`inline-flex  items-center`}>
            <MdOutlineLock />
            <p className='ml-1 text-sm font-light'>Private</p>
          </div>
        </div>
      </div>
    </header>
  )
}
