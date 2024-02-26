// components/Header.tsx
import React, { useState } from 'react'

interface HeaderProps {
  onSelectTab: (selectedTab: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onSelectTab }) => {
  const [selectedTab, setSelectedTab] = useState('profile')
  const avtPath = '/src/assets/Profile/avt.png'
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
    onSelectTab(tab)
  }

  return (
    <header className='left-0 mx-16 mt-16  bg-white py-2'>
      <div className='flex max-w-2xl items-center space-x-4'>
        <img
          src={avtPath} // Replace with your avatar image source
          alt='Avatar'
          className='h-10 h-[65px] w-10 w-[65px] rounded-full border'
        />
        <div>
          <h1 className='text-xl font-bold text-gray-700'>Your Name</h1>
          <p className='text-sm font-light text-gray-500'>@name123</p>
        </div>
      </div>
      <div className='mt-[70px] flex space-x-4 border-b-2 border-gray-300'>
        <button
          className={`py-2 ${selectedTab === 'profile' ? 'border-b-4 border-blue-600' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <p className={`font-bold ${selectedTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}>
            Profile & Visibility
          </p>
        </button>
        <button
          className={`py-2 ${selectedTab === 'activity' ? 'border-b-4 border-blue-600' : ''}`}
          onClick={() => handleTabClick('activity')}
        >
          <p className={`font-bold ${selectedTab === 'activity' ? 'text-blue-600' : 'text-gray-600'}`}>Activity</p>
        </button>
      </div>
    </header>
  )
}
