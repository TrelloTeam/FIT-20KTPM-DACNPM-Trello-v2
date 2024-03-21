// components/Profile.tsx
import React, { useEffect, useState } from 'react'
import { useTheme } from '~/components/Theme/themeContext'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'
export const Profile: React.FC = () => {
  const image = '/src/assets/Profile/profile_img.svg'
  const { colors, darkMode } = useTheme()
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>('')
  useEffect(() => {
    setSelectedOption('Instantly')
  }, [])
  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
  }
  function deleteAccount() {
    alert('account has been deleted')
  }
  return (
    <div className='mx-auto mt-10 max-w-xl rounded p-10 pb-1'>
      <img
        src={image} // Replace with your avatar image source
        alt='Avatar'
        className='mb-8 w-full'
      />

      <div className='space-y-6 '>
        <div>
          <h2 className={`mb-2 text-2xl font-semibold `}>Manage your personal information</h2>
        </div>
        <div>
          <h1
            className={`mb-2 border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}  pb-2 text-xl font-semibold `}
          >
            About
          </h1>
        </div>
        <div className={`w-full border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}  pb-2`}>
          <label className='mb-2 block' htmlFor='bio'>
            <p className={` font-semibold`}>Username</p>
          </label>

          <input
            style={{
              backgroundColor: colors.background,
              color: colors.text
            }}
            className={`mb-2 w-full resize-none rounded border-[3px] ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'}  p-2 hover:bg-gray-100 focus:border-[3px] focus:border-blue-400 focus:outline-none`}
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
            className={`mb-2 w-full resize-y rounded border-[3px] ${darkMode ? 'border-[#738496]' : 'border-[#9da6b5]'} p-2 focus:border-[3px] focus:border-blue-400 focus:outline-none `}
            rows={3}
          />
          <button
            style={{
              backgroundColor: !isHovered ? colors.add_card : colors.add_card_hover,
              color: !darkMode ? 'white' : 'black'
            }}
            className={`mt-10 h-8 w-full rounded bg-blue-600 font-semibold text-white `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Save
          </button>
        </div>
        <div>
          <h1
            className={`mb-2 border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}  pb-2 text-xl font-semibold `}
          >
            Email Notification
          </h1>
        </div>
        <div className={`w-full text-sm`}>
          <div className={`inline-flex items-center space-x-1`}>
            <AiOutlineClockCircle />
            <p className={`font-semibold`}>Email frequency</p>
          </div>
          <p className={`my-2`}>
            Email notifications can be sent ‘Instantly’ (as soon as they occur) or ‘Periodically’ (hourly). If you’d
            like to opt-out of all notification emails, set the frequency as ‘Never’.
          </p>
          <div className={`my-2 `}>
            <p className={`text-[12px] font-semibold`}>Frequency </p>
            <div className='relative mt-1 flex w-40 flex-col'>
              <div
                className={`flex cursor-pointer items-center rounded border-[3px] px-3 py-2 ${
                  darkMode
                    ? isOpen
                      ? ' border-blue-500  bg-[#282e33] hover:bg-[#333c43]'
                      : ' bg-[#282e33] hover:bg-[#333c43] hover:border-[#333c43] border-[#282e33]'
                    : isOpen
                      ? ' border-blue-500 bg-white'
                      : 'border-gray-100 bg-gray-100 hover:border-[#dcdfe4] hover:bg-[#dcdfe4]'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div style={{ color: colors.text }} className='inline-flex items-center space-x-16 '>
                  <p>{selectedOption}</p>
                  <RiArrowDropDownLine size={`25px`} />
                </div>
              </div>
              {isOpen && (
                <div className={`z-10 mt-1 rounded ${darkMode ? 'bg-[#282e33]' : 'bg-white'}  shadow-lg `}>
                  <ul>
                    <li
                      className={` ${
                        darkMode
                          ? selectedOption === 'Never'
                            ? 'bg-[#1c2b41] text-[#b6c2cf]'
                            : ' hover:bg-[#333c43]'
                          : selectedOption === 'Never'
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            : ' hover:bg-[#dcdfe4]'
                      }  px-4 py-2 `}
                      onClick={() => handleOptionClick('Never')}
                    >
                      Never
                    </li>
                    <li
                      className={` ${
                        darkMode
                          ? selectedOption === 'Instantly'
                            ? 'bg-[#1c2b41] text-[#b6c2cf]'
                            : ' hover:bg-[#333c43]'
                          : selectedOption === 'Instantly'
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            : ' hover:bg-[#dcdfe4]'
                      }  px-4 py-2 `}
                      onClick={() => handleOptionClick('Instantly')}
                    >
                      Instantly
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='   mt-10 flex'>
        <button
          className={`flex items-center rounded px-5 py-2 ${
            darkMode ? 'bg-[#282e33] hover:bg-[#333c43]' : 'bg-gray-100 hover:bg-[#dcdfe4]'
          } `}
          onClick={() => deleteAccount()}
        >
          <p style={{ color: colors.text }} className={`font-semibold`}>
            Delete your account
          </p>
        </button>
      </div>
    </div>
  )
}
