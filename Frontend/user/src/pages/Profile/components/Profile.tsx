// components/Profile.tsx
import React from 'react'
import { useTheme } from '~/components/Theme/themeContext'

export const Profile: React.FC = () => {
  const image = '/src/assets/Profile/profile_img.svg'
  const { colors } = useTheme()
  const text_bold_color = 'text-gray-700'
  const text_profile_color = 'text-gray-600'
  function deleteAccount() {
    alert('Delete Account')
  }
  return (
    <div className='mx-auto mt-10 max-w-2xl rounded p-10'>
      <img
        src={image} // Replace with your avatar image source
        alt='Avatar'
        className='mb-8 w-full'
      />

      <div className='space-y-6 '>
        <div>

          <h2 className={`mb-2 text-2xl font-bold `}>Manage your personal information</h2>
        </div>
        <div>
          <h1 className={`mb-2 border-b-2 border-gray-300 pb-2 text-xl font-semibold `}>About</h1>

        </div>
        <div className={`w-8/12`}>
          <label className='mb-2 block' htmlFor='bio'>
            <p className={` font-semibold`}>Username</p>
          </label>

          <input
            style={{
              backgroundColor: colors.background,
              color: colors.text
            }}
            className={`mb-2 w-full resize-none rounded border-[3px] border-gray-700 p-2 hover:bg-gray-100 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
          />

          <label className='mb-2 block' htmlFor='bio'>
            <p className={` font-semibold`}>Bio</p>
          </label>

          <textarea
            id='bio'
            style={{
              backgroundColor: colors.background,
              color: colors.text
            }}
            className='mb-2 w-full resize-y rounded border-[3px] border-gray-700 p-2 focus:border-[3px] focus:border-blue-400 focus:outline-none '
            rows={3}
          />
          <button className={`mt-10 h-8 w-full rounded bg-blue-600 text-white `}>Save</button>

        </div>
      </div>
      {/* <div className='ml-5 mt-10 mb-0 flex justify-center w-7/12'>
        <button className={`absolute -bottom-2 rounded bg-gray-200 hover:bg-gray-300 p-2 `} onClick={() => deleteAccount()}>
          <p className={`font-semibold text-gray-700`}>Delete account</p>
        </button>
      </div> */}
    </div>
  )
}
