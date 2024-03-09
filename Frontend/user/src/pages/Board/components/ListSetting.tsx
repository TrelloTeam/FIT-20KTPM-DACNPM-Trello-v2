import { useTheme } from '~/components/Theme/themeContext'

interface ListSettingProps {
  closeListSetting: () => void
}

export default function ListSetting({ closeListSetting }: ListSettingProps) {
  const { colors, darkMode } = useTheme()
  return (
    <div
      style={{
        backgroundColor: darkMode ? '#2c3e50' : 'white',
        color: darkMode ? '#d2dae2' : '#2f3542',
        borderWidth:"1px",
        borderColor:darkMode ? '#57606f' : '#f1f2f6',
      }}
      className={`absolute -right-2/3 -top-10 z-50 flex w-[300px] flex-row rounded-lg   px-1 py-2 font-semibold`}
    >
      <div className={`relative w-full`}>
        <div className={`mb-2 flex justify-between p-2`}>
          <div></div>
          <div>
            <p className={`font-bold`}>List actions</p>
          </div>
          <div className='mr-2 cursor-pointer rounded-lg px-1 hover:bg-gray-100' onClick={closeListSetting}>
            X
          </div>
        </div>
        <div>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Add card</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Copy list</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Move list</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Watch</button>
        </div>
        <div className='my-2 flex justify-center'>
          <hr className={`h-[1px] w-11/12 border-0 ${darkMode?'bg-gray-500':'bg-gray-300'}`}></hr>
        </div>
        <div className={``}>
          <p className={`w-full p-2 text-left text-xs font-bold`}>Sort by...</p>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Dated created (newest List)</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Dated created (oldest List)</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Card name (alphabetically)</button>
        </div>
        <div className='my-2 flex justify-center'>
          <hr className={`h-[1px] w-11/12 border-0 ${darkMode?'bg-gray-500':'bg-gray-300'}`}></hr>
        </div>
        <div className={``}>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Move all card in this list</button>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Archive all card in this list</button>
        </div>
        <div className='my-2 flex justify-center'>
          <hr className={`h-[1px] w-11/12 border-0 ${darkMode?'bg-gray-500':'bg-gray-300'}`}></hr>
        </div>
        <div className={``}>
          <button className={`m-0 w-full p-2 text-left hover:bg-gray-200`}>Archive this list</button>
        </div>
      </div>
    </div>
  )
}
