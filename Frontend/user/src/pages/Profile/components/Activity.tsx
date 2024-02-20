// components/Activity.tsx
import React, { useEffect, useState } from 'react'
import { Activity, Workspace } from '../type'
import { activityData, workspaceData } from '../testData'
import { MdOutlineLock, MdOutlineLockOpen  } from "react-icons/md";
export const ActivityComponent: React.FC = () => {
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
        <p className={`my-2 border-b-2 border-gray-300 pb-2 text-lg font-semibold text-gray-700`}>Workspace</p>
        {workspace?.map((w, index) => (
          <div className='my-2 ml-2 flex flex-row items-center space-x-4 border-b-2 border-gray-300 pb-2'>
            <p className={`font-light text-gray-700`}>{w.name}</p>
            {w.visibility === 'public' ? <MdOutlineLockOpen className='text-green-500' /> : <MdOutlineLock className='text-red-500' />}
          </div>
        ))}
      </div>
      <div className={`mb-10`}>
        <p className={`my-2 border-b-2 border-gray-300 pb-2 text-lg font-semibold text-gray-700`}>Activity</p>
        {activity?.map((a, index) => (
          <div className='my-2 space-x-4 border-b-2 border-gray-300 pb-2'>
            <p className={`text-gray-700`}>{a.content}</p>
            <div className={`flex flex-row space-x-2 items-center`}>
              <p className={`text-sm font-light text-gray-700 `}>Jan 29 at 9.00 AM. On board  </p>
              <p className={`font-semibold flex flex-row items-center`}> 
              My Board <MdOutlineLock className='text-red-500 ml-2' size={'15px'} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
