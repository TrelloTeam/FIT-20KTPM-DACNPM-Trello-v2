// pages/account-management.tsx
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ActivityComponent, Header, Profile } from './components'

type AccountManagementProps = {
  page: string
}

export const AccountManagement: React.FC<AccountManagementProps> = ({ page }) => {
  const [selectedTab, setSelectedTab] = useState<string>('')
  useEffect(() => {
    setSelectedTab(page)
    console.log(page)
  }, [page])
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <>
      <Head>
        <title>Your Profile</title>
      </Head>

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
    </>
  )
}
