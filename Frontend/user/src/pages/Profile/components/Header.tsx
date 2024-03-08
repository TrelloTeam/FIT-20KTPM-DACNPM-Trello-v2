// components/Header.tsx
import React, { useEffect, useState } from 'react'

import { RxAvatar } from 'react-icons/rx'

interface HeaderProps {
  currentTab: string
  onSelectTab: (selectedTab: string) => void
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  const [selectedTab, setSelectedTab] = useState<string>('')
  const avtPath = '/src/assets/Profile/avt.png'
  useEffect(() => {
    setSelectedTab(currentTab)
  }, [currentTab])
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
    onSelectTab(tab)
  }

  return (

    <header className='left-0 mx-14  py-2'>
      <div className='mt-16 flex max-w-2xl items-center space-x-4'>
        {/* <img

          src={avtPath} // Replace with your avatar image source
          alt='Avatar'
          className=' h-[65px] w-[65px] rounded-full border'
        /> */}
        <RxAvatar size={`70px`} />
        <div>
          <h1 className='text-xl font-bold'>Your Name</h1>
          <p className='text-sm font-light '>@name123</p>
        </div>
      </div>
      <div className='mt-[70px] flex'>
        <p
          className={`cursor-pointer border-b-[3px] pb-2 font-bold ${selectedTab === 'profile' ? 'border-blue-600 text-blue-600' : 'border-gray-300  hover:text-blue-600'}`}
          onClick={() => handleTabClick('profile')}
        >
          Profile and visibility
        </p>
        <div className={` w-[20px] border-b-[3px] border-gray-300`}></div>
        <p
          className={`cursor-pointer border-b-[3px] pb-2 font-bold  ${selectedTab === 'activity' ? 'border-blue-600 text-blue-600' : 'border-gray-300  hover:text-blue-600'}`}
          onClick={() => handleTabClick('activity')}
        >

          Activity
        </p>

        <div className={`flex-grow border-b-[3px] border-gray-300`}></div>

      </div>
    </header>
  )
}
