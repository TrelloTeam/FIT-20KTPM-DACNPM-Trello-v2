// pages/account-management.tsx
import React, { useEffect, useState } from 'react'
import { ActivityComponent, Header, Profile } from './components'
import { useTheme } from '../../components/Theme/themeContext'
import { User } from '@trello-v2/shared/src/schemas/User'
import { mockUser } from './testData'

type AccountManagementProps = {
  page: string
}

export const AccountManagement: React.FC<AccountManagementProps> = ({ page }) => {
  const [selectedTab, setSelectedTab] = useState<string>('')
  const [userInfo, setUserInfo] = useState<User>()
  const [resetManually, setResetManually] = useState<boolean>()
  const { colors } = useTheme()
  useEffect(()=>{
    setUserInfo(mockUser)
  },[resetManually])
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
          <Header userInfo={userInfo}  onSelectTab={handleTabSelect} currentTab={selectedTab} />
          <Profile userInfo={userInfo} handleUpdateProfile={()=> {setResetManually(!resetManually)}}/>
        </>
      ) : (
        <>
          <Header userInfo={userInfo} onSelectTab={handleTabSelect} currentTab={selectedTab} />
          <ActivityComponent userInfo={userInfo}/>
        </>
      )}
    </div>
  )
}
