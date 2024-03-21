import React from 'react'
import { MdOutlineLock, MdPublic } from 'react-icons/md'
import { LuPen } from 'react-icons/lu'
import { useTheme } from '../Theme/themeContext'

interface WorkspaceInfoProps {
  visibility: string | undefined
  handleEditClick: () => void
}

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ visibility, handleEditClick }) => {
  const { darkMode } = useTheme()
  return (
    <div className='flex flex-col'>
      <div className={`inline-flex  items-center`}>
        <h1 className='mr-2 text-xl font-semibold'>My Workspace</h1>
        <LuPen
          size={`22px`}
          className={`cursor-pointer rounded-md p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
          onClick={handleEditClick}
        />
      </div>
      {visibility === 'private' && (
        <div className={`inline-flex  items-center`}>
          <MdOutlineLock />
          <p className='ml-1 text-sm font-light'>Private</p>
        </div>
      )}
      {visibility === 'public' && (
        <div className={`inline-flex  items-center`}>
          <MdPublic />
          <p className='ml-1 text-sm font-light'>Public</p>
        </div>
      )}
    </div>
  )
}

export default WorkspaceInfo
