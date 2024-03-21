// pages/account-management.tsx
import React, { useEffect, useState } from 'react'
import { ActivityComponent, Header, Profile } from './components'
import { useTheme } from '../../components/Theme/themeContext'

type AccountManagementProps = {
  page: string
}

export const AccountManagement: React.FC<AccountManagementProps> = ({ page }) => {
  const [selectedTab, setSelectedTab] = useState<string>('')

  const { colors } = useTheme()

  useEffect(() => {
    setSelectedTab(page)
    console.log(page)
  }, [page])
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab)
  }
  const darkLightMode = {
    backgroundColor: colors.background,
    color: colors.text
  }
  return (
    <div style={darkLightMode} className='font-sans'>
      {selectedTab === 'profile' ? (
        <>
          <Header onSelectTab={handleTabSelect} currentTab={selectedTab} />
          <Profile />
        </>
      ) : (
        <>
          <Header onSelectTab={handleTabSelect} currentTab={selectedTab} />
          <ActivityComponent />
        </>
      )}
    </div>
  )
}
