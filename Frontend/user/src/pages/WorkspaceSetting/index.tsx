// pages/account-management.tsx
import React, { useEffect, useState } from 'react'
import { Header, Settings } from './components'
import { useTheme } from '../../components/Theme/themeContext'



export const WorkspaceSetting: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('')

  const { colors } = useTheme()

  // useEffect(() => {
  //   setSelectedTab(page)
  //   console.log(page)
  // }, [page])
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab)
  }
  const darkLightMode = {
    backgroundColor: colors.background,
    color: colors.text
  }
  
  return (
    <div style={darkLightMode}>

          <Header />
          <Settings />
    </div>
  )
}
