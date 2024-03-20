// components/Activity.tsx
import React, { useEffect, useState } from 'react'
import { Activity, Workspace } from '../type'
import { activityData, workspaceData } from '../testData'
import { MdOutlineLock, MdOutlineLockOpen } from 'react-icons/md'

import { RxActivityLog, RxAvatar } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'

export const ActivityComponent: React.FC = () => {
  const [activity, setActivity] = useState<Activity[]>()
  const [workspace, setWorkspace] = useState<Workspace[]>()
  const [activityCount, setActivityCount] = useState<number>(3)
  useEffect(() => {
    addWorkSpaceName()
  }, [activityCount])

  function getActivity(data: Activity[], count: number) {
    if (count < data.length) return data.slice(0, count)
    else return data
  }
  function addWorkSpaceName() {
    const newData = getActivity(activityData, activityCount)
    const activityDataWithWorkspaceName = newData.map((activityItem) => {
      const workspaceItem = workspaceData.find((workspace) => workspace._id === activityItem.workspace_id)
      const workspaceName = workspaceItem ? workspaceItem.name : 'Unknown Workspace'

      return {
        ...activityItem,
        workspace_name: workspaceName
      }
    })
    setActivity(activityDataWithWorkspaceName)
    setWorkspace(workspaceData)
  }
  return (
    <div className={`mx-52 mt-4 max-w-2xl p-8`}>
      <div className={`mb-10`}>
        <div className={' flex flex-row'}>
          <SlPeople size={'20px'} className={`mr-5 mt-1`} />
          <p className={`border-b-2 border-gray-300 pb-2 text-lg font-semibold`}>Workspaces</p>
          <div className={`flex-grow border-b-2 border-gray-300 pb-2`}></div>
        </div>

        {workspace?.map((w, index) => (
          <div key={index} className={`flex flex-row`}>
            <div className={`w-[40px]`}></div>
            <div
              className={` flex w-full cursor-pointer flex-row items-center space-x-4 border-b-2 border-gray-300 py-2 hover:bg-gray-200`}
            >
              <p className={`ml-2  `}>{w.name}</p>

              {w.visibility === 'public' ? (
                <MdOutlineLockOpen className='text-green-500' />
              ) : (
                <MdOutlineLock className='text-red-500' />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={`mb-10`}>
        <div className={'mb-3 flex flex-row'}>
          <RxActivityLog size={'20px'} className={`mr-5 mt-1`} />
          <p className={`border-b-2 border-gray-300 pb-2 text-lg font-semibold`}>Activity</p>
          <div className={`flex-grow border-b-2 border-gray-300 pb-2`}></div>
        </div>
        {activity?.map((a, index) => (
          <div key={index} className='my-2   pb-2'>
            <div className={`flex flex-row items-center space-x-2`}>
              {/* <img
                src={avtPath} // Replace with your avatar image source
                alt='Avatar'
                className='-ml-2 mr-1 h-9 w-9 cursor-pointer rounded-full border hover:opacity-60'
              /> */}
              <RxAvatar className={`-ml-2 mr-1 h-9 w-9 cursor-pointer rounded-full  hover:opacity-60`} />
              <div>
                <p>{a.content}</p>
                <div className={`flex flex-row items-center space-x-2`}>
                  <p className={`text-sm font-light  `}>Jan 29 at 9.00 AM. On board </p>
                  <p className={`flex cursor-pointer flex-row items-center font-semibold`}>
                    <span className={`border-b-2 border-gray-700`}>My Board </span>{' '}
                    <MdOutlineLock className='ml-2 text-red-500' size={'15px'} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {activityCount && activityCount < activityData.length && (
          <div className='my-5 ml-5'>
            <button
              className={`rounded bg-gray-200 hover:bg-gray-300 `}
              onClick={() => setActivityCount(activityCount + 3)}
            >
              <p className={`font-semibold text-gray-700`}>Load more activity</p>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
