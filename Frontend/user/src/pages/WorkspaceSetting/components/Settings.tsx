import React, { useState, useRef, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineLock, MdPublic } from 'react-icons/md'
import { useTheme } from '~/components/Theme/themeContext'
import { FaCheck } from 'react-icons/fa6'
export const Settings: React.FC = () => {
  const image = '/src/assets/Profile/profile_img.svg'
  const { colors, darkMode } = useTheme()
  const [visibility, setVisibility] = useState<string>('private')
  const [showForm, setShowForm] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   // Check if there's enough space above or below the button to display the form
  //   if (formRef.current) {
  //     const buttonRect = formRef.current.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;
  //     const spaceAboveButton = buttonRect.top;
  //     const spaceBelowButton = windowHeight - buttonRect.bottom;
  //     setShowForm(spaceAboveButton > spaceBelowButton);
  //   }
  // }, [showForm]);

  const handleVisibilityChange = (newVisibility: string) => {
    setVisibility(newVisibility)
    setShowForm(false)
  }

  return (
    <div className='mx-14 mt-10 rounded px-[10%]'>
      <div>
        <h2 className={`mb-2 text-xl font-semibold`}>Workspace settings</h2>
      </div>

      <div className='space-y-1 '>
        <div>
          <h1 className={` border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}  pb-2  font-semibold `}>
            Workspace visibility
          </h1>
        </div>
        <div className={`flex w-full flex-row justify-between `}>
          <div className={`mt-1 flex w-full flex-row space-x-1`}>
            {visibility === 'public' ? (
              <>
                <p className='flex flex-row'>
                  <span>
                    {' '}
                    <MdPublic className='mr-1 mt-1 p-0 text-green-500' />
                  </span>{' '}
                  Public - This Workspace is public. It's visible to anyone with the link and will show up in search
                  engines like Google. Only those invited to the Workspace can add and edit Workspace boards.
                </p>
              </>
            ) : (
              <>
                <p className='flex flex-row'>
                  <span>
                    {' '}
                    <MdOutlineLock className='mr-1 mt-1 p-0 text-red-500' />
                  </span>{' '}
                  Private - This Workspace is private. It's not indexed or visible to those outside the Workspace
                </p>
              </>
            )}
          </div>
          <div ref={formRef} className={`relative`}>
            <button
              className={`flex items-center rounded px-5 py-2 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-300'
              } `}
              onClick={() => setShowForm(!showForm)}
            >
              <p style={{ color: colors.text }} className={`font-semibold`}>
                Change
              </p>
            </button>
            {showForm && (
              <div className='absolute -left-5 z-10 w-80 rounded-lg border border-gray-300 bg-white py-4 text-sm shadow-md'>
                <div className={`mb-2 flex items-center justify-between`}>
                  <div></div>
                  <div>
                    <p className={`ml-7 font-semibold`}>Select Workspace visibility</p>
                  </div>
                  <div
                    className=' mr-2 cursor-pointer rounded-lg p-1 hover:bg-gray-100'
                    onClick={() => setShowForm(false)}
                  >
                    <IoMdClose className={``} size={'15px '} />
                  </div>
                </div>
                <button
                  onClick={() => handleVisibilityChange('private')}
                  className={`w-full py-2 ${darkMode ? ' hover:bg-gray-700' : ' hover:bg-gray-300'}`}
                >
                  <p className='flex flex-row items-center text-start'>
                    <span>
                      {' '}
                      <MdOutlineLock className='mr-1 p-0 text-red-500' />
                    </span>{' '}
                    Private
                    {visibility === 'private' && (
                      <>
                        <span>
                          {' '}
                          <FaCheck className='ml-1 p-0' />
                        </span>{' '}
                      </>
                    )}
                  </p>
                  <p className={`text-start text-[12px]`}>
                    This Workspace is private. It's not indexed or visible to those outside the Workspace
                  </p>
                </button>
                <button
                  onClick={() => handleVisibilityChange('public')}
                  className={`w-full py-2 ${darkMode ? ' hover:bg-gray-700' : ' hover:bg-gray-300'}`}
                >
                  <p className='flex flex-row items-center text-start'>
                    <span>
                      {' '}
                      <MdPublic className='mr-1 p-0 text-green-500' />
                    </span>{' '}
                    Public
                  </p>
                  <p className={`text-start text-[12px]`}>
                    Public - This Workspace is public. It's visible to anyone with the link and will show up in search
                    engines like Google. Only those invited to the Workspace can add and edit Workspace boards.
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
