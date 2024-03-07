// components/Header.tsx
import React, { useEffect, useState } from 'react'

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
    <header className='left-0 mx-14 mt-16  bg-white py-2'>
      <div className='flex max-w-2xl items-center space-x-4'>
        <img
          src={avtPath} // Replace with your avatar image source
          alt='Avatar'
          className=' h-[65px] w-[65px] rounded-full border'
        />
        <div>
          <h1 className='text-xl font-bold text-gray-700'>Your Name</h1>
          <p className='text-sm font-light text-gray-500'>@name123</p>
        </div>
      </div>
      <div className='mt-[70px] flex'>
        <p
          className={`cursor-pointer border-b-[3px] pb-2 font-bold ${selectedTab === 'profile' ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600 hover:text-blue-600'}`}
          onClick={() => handleTabClick('profile')}
        >
          Profile and visibility
        </p>
        <div className={` w-[20px] border-b-[3px] border-gray-300`}></div>
        <p
          className={`cursor-pointer border-b-[3px] pb-2 font-bold  ${selectedTab === 'activity' ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-600 hover:text-blue-600'}`}
          onClick={() => handleTabClick('activity')}
        >
          Activity
        </p>

        <div className={`flex-grow border-b-[3px] border-gray-300`}></div>
      </div>
    </header>
  )
}
