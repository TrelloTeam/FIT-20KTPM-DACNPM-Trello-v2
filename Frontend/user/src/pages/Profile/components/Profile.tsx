// components/Profile.tsx
import React from 'react'

export const Profile: React.FC = () => {
  const image = '/src/assets/Profile/profile_img.svg'
  const text_bold_color = 'text-gray-700'
  const text_profile_color = 'text-gray-600'
  return (
    <div className='mx-auto my-10 max-w-2xl rounded bg-white p-10'>
      <img
        src={image} // Replace with your avatar image source
        alt='Avatar'
        className='mb-8 w-full'
      />

      <div className='space-y-6'>
        <div>
          <h2 className={`mb-2 text-2xl font-bold ${text_bold_color}`}>Manage your personal information</h2>
        </div>
        <div>
          <h1 className={`mb-2 border-b-2 border-gray-300 pb-2 text-xl font-semibold  ${text_bold_color}`}>
            About
          </h1>
        </div>
        <div className={`w-8/12`}>
          <label className='mb-2 block' htmlFor='bio'>
            <p className={`${text_profile_color} font-semibold`}>Username</p>
          </label>
          <input className='mb-2 w-full resize-none rounded border-4 p-2' />
          <label className='mb-2 block' htmlFor='bio'>
            <p className={`${text_profile_color} font-semibold`}>Bio</p>
          </label>
          <textarea id='bio' className='mb-2 w-full resize-y rounded border-4 p-2 hover:border-blue-600 ' rows={3} />
          <button className={`rounded bg-blue-600 text-white w-full mt-10 h-8 `}>Save</button>
        </div>
      </div>
    </div>
  )
}
