import React, { useEffect, useState } from 'react'
import { MdOutlineLock } from 'react-icons/md'
import { LuPen } from 'react-icons/lu'
import { useTheme } from '~/components/Theme/themeContext'
import { AiOutlineUserAdd } from 'react-icons/ai'
import InviteForm from './AddWorkspaceMembersForm'
export const Header: React.FC = () => {
  const { colors, darkMode } = useTheme()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isHoverLogo, setIsHoverLogo] = useState<boolean>(false)

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
            <div
              onMouseEnter={() => setIsHoverLogo(true)}
              onMouseLeave={() => setIsHoverLogo(false)}
              className={`relative flex h-[65px] w-[65px] items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-purple-500  shadow-sm`}
            >
              <h1 className={`text-4xl font-bold text-white`}>T</h1>
              {isHoverLogo && (
                <div
                  style={{
                    color: darkMode ? colors.black : colors.white
                  }}
                  className={`absolute bottom-0 flex h-1/2 w-full items-center justify-center rounded-b-md bg-black ${darkMode ? 'bg-opacity-10' : 'bg-opacity-30'}`}
                >
                  <p className={`cursor-pointer font-bold underline`}>Change</p>
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <div className={`inline-flex  items-center`}>
                <h1 className='mr-2 text-xl font-semibold'>My Workspace</h1>
                <LuPen
                  size={`22px`}
                  className={`cursor-pointer rounded-md p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                  onClick={handleEditClick}
                />
              </div>
              <div className={`inline-flex  items-center`}>
                <MdOutlineLock />
                <p className='ml-1 text-sm font-light'>Private</p>
              </div>
            </div>
          </>
        ) : (
          // Render edit form when editing
          <div className='flex w-6/12 flex-col'>
            <div className='flex flex-col space-y-2'>
              <div className={`flex flex-col`}>
                <label className='text-[12px] font-bold'>
                  Name<span className='text-red-500'>*</span>
                </label>
                <input
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                  type='text'
                  id='name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`rounded-sm border-[3px]  ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'} p-1 px-2 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
                />
              </div>
              <div className={`flex flex-col`}>
                <label className='text-[12px] font-bold'>
                  Short name<span className='text-red-500'>*</span>
                </label>
                <input
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                  type='text'
                  id='shortName'
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className={`rounded-sm border-[3px]  ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'} p-1 px-2 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
                />
              </div>
              <div className={`flex flex-col`}>
                <label className='text-[12px] font-bold'>Website (Optional)</label>
                <input
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                  type='text'
                  id='website'
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`rounded-sm border-[3px]  ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'} p-1 px-2 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
                />
              </div>
              <div className={`flex flex-col`}>
                <label className='text-[12px] font-bold'>Description (Optional)</label>
                <textarea
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                  id='description'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`resize-y rounded-sm border-[3px]  ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'} p-1 px-2 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
                />
              </div>
            </div>

            <div className='mt-2 flex'>
              <button
                onClick={handleSaveClick}
                disabled={!isFormValid} // Disabling the button if the form is not valid
                className={`mr-2 rounded px-3 py-2 font-semibold ${
                  !isFormValid
                    ? darkMode
                      ? 'bg-gray-800 opacity-50 cursor-not-allowed'
                      : 'bg-gray-100 opacity-50 cursor-not-allowed'
                    : darkMode
                      ? 'bg-[#579dff] text-gray-700 hover:bg-[#7bb0f9]'
                      : 'bg-[#0c66e4] text-white hover:bg-[#0e5bc7]'
                }`}
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className={`mr-2 rounded px-3 py-2 text-sm font-semibold ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} `}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
     <InviteForm/>
    </header>
  )
}
