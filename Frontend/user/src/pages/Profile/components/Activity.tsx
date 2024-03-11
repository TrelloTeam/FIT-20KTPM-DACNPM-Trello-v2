// components/Activity.tsx
import React, { useEffect, useState } from 'react'
import { Activity, Workspace } from '../type'
import { activityData, workspaceData } from '../testData'
import { MdOutlineLock, MdOutlineLockOpen } from 'react-icons/md'

import { RxActivityLog } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'

export const ActivityComponent: React.FC = () => {
  const avtPath = '/src/assets/Profile/avt.png'
  const [activity, setActivity] = useState<Activity[]>()
  const [workspace, setWorkspace] = useState<Workspace[]>()
  useEffect(() => {
    const activityDataWithWorkspaceName = activityData.map((activityItem) => {
      const workspaceItem = workspaceData.find((workspace) => workspace._id === activityItem.workspace_id)
      const workspaceName = workspaceItem ? workspaceItem.name : 'Unknown Workspace'

      return {
        ...activityItem,
        workspace_name: workspaceName
      }
    })
    setActivity(activityDataWithWorkspaceName)
    setWorkspace(workspaceData)
  }, [])

  return (
    <div className='mx-64 mt-4 max-w-2xl bg-white p-8'>
      <div className={`mb-10`}>
        <div className={'flex flex-row items-center space-x-4 border-b-2 border-gray-300 pb-2'}>
          <SlPeople size={'20px'} />
          <p className={`my-2  text-lg font-semibold text-gray-700`}>Workspace</p>
        </div>

        {workspace?.map((w) => (
          <div className='my-2 flex flex-row items-center space-x-4 border-b-2 border-gray-300 pb-2'>
            <p className={`ml-2 font-light text-gray-700`}>{w.name}</p>

            {w.visibility === 'public' ? (
              <MdOutlineLockOpen className='text-green-500' />
            ) : (
              <MdOutlineLock className='text-red-500' />
            )}
          </div>
        ))}
      </div>
      <div className={`mb-10`}>
        <div className={'flex flex-row items-center space-x-4  border-b-2 border-gray-300 pb-2'}>
          <RxActivityLog size={'20px'} />
          <p className={`my-2  text-lg font-semibold text-gray-700`}>Activity</p>
        </div>
        {activity?.map((a, index) => (
          <div key={index} className='my-2 space-x-4  pb-2'>
            <div className={`flex flex-row items-center space-x-2`}>
              <img
                src={avtPath} // Replace with your avatar image source
                alt='Avatar'
                className='-ml-2 h-9 w-9 rounded-full border'
              />
              <div>
                <p className={`text-gray-700`}>{a.content}</p>
                <div className={`flex flex-row items-center space-x-2`}>
                  <p className={`text-sm font-light text-gray-700 `}>Jan 29 at 9.00 AM. On board </p>
                  <p className={`flex flex-row items-center font-semibold`}>
                    My Board <MdOutlineLock className='ml-2 text-red-500' size={'15px'} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
