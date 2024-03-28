import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useTheme } from '~/components/Theme/themeContext'

import InviteForm from './AddWorkspaceMembersForm'

import LogoSection from './LogoSection'
import WorkspaceInfo from './WorkspaceInfo'
import EditForm from './EditForm'
import { WorkspaceApiRTQ } from '~/api'
import { UpdateWorkspaceInfoRequest } from '@trello-v2/shared/dist/src/api/WorkspaceApi'
interface HeaderWpSetting {
  visibility: string
}

export const WorkspaceHeader: React.FC<HeaderWpSetting> = ({ visibility }) => {
  const { colors, darkMode } = useTheme()
  const [resetUseStateManual, setResetUseStateManual] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [updateWorkspaceInfo] = WorkspaceApiRTQ.WorkspaceApiSlice.useUpdateWorkspaceMutation()
  const [formData, setFormData] = useState<UpdateWorkspaceInfoRequest>({
    _id: 'string',
    name: '123',
    short_name: 'string',
    description: 'string',
    website: 'string',
    logo: '',
    members: []
  })
  useEffect(() => {
    //getWorkspace...
  }, [resetUseStateManual])
  const isFormValid = formData.name?.trim() !== '' && formData.short_name?.trim() !== ''
  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    updateWorkspaceInfo(formData).then(() => {
      setResetUseStateManual(!resetUseStateManual)
      setIsEditing(false)
    })
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
