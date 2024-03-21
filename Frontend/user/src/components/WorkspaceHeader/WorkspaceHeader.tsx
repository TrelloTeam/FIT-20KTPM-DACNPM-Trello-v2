import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { MdOutlineLock, MdPublic } from 'react-icons/md'
import { LuPen } from 'react-icons/lu'
import { useTheme } from '~/components/Theme/themeContext'
import { AiOutlineUserAdd } from 'react-icons/ai'
import InviteForm from './AddWorkspaceMembersForm'
import { IoMdClose } from 'react-icons/io'
import logo_temp from '../../assets/bg_help.png'
import { RxAvatar } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'
import LogoSection from './LogoSection'
import WorkspaceInfo from './WorkspaceInfo'
import EditForm from './EditForm'
interface HeaderWpSetting {
  visibility: string | undefined
}

export const WorkspaceHeader: React.FC<HeaderWpSetting> = ({ visibility }) => {
  const { colors, darkMode } = useTheme()
  const [isEditing, setIsEditing] = useState<boolean>(false)


  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    website: '',
    description: ''
  })
  const isFormValid = formData.name.trim() !== '' && formData.shortName.trim() !== ''
  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    // Handle save functionality here
    // You can save form data to the backend or perform other actions
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    // Handle cancel functionality here
    setIsEditing(false)
  }

  return (
    <header className={`relative mx-14  border-b-2 py-2  ${!darkMode ? 'border-gray-300  ' : 'border-gray-700 '} `}>
      <div className='my-4 flex max-w-2xl items-center space-x-4 pl-[10%]'>
        {!isEditing ? (
          <>
            <LogoSection />
            <WorkspaceInfo visibility={visibility} handleEditClick={handleEditClick} />
          </>
        ) : (
          <EditForm
            formData={formData}
            setFormData={setFormData}
            isFormValid={isFormValid}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />
        )}
      </div>
      <InviteForm />
    </header>
  )
}
