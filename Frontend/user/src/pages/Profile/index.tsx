// pages/account-management.tsx
import React, { useState } from 'react'
import Head from 'next/head'
import { ActivityComponent, Header, Profile } from './components'

export const AccountManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('profile')

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <>
      <Head>
        <title>Your Profile</title>
      </Head>
      <Header onSelectTab={handleTabSelect} />
      {selectedTab === 'profile' ? <Profile /> : <ActivityComponent />}
    </>
  )
}
