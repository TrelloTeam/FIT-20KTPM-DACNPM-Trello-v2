import { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import SettingsIcon from '@mui/icons-material/Settings'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { workspaceData } from '../pages/Templates/testData'
import { Workspace } from '../pages/Templates/type'
import { Button } from '@mui/base'

function SidebarTemplate() {
  const [workspace, setWorkspace] = useState<Workspace[]>()

  useEffect(() => {
    setWorkspace(workspaceData)
  }, [])

  return (
    <div className='detail-sidebar-container fixed ml-20 mt-10 max-h-90vh max-h-screen w-64 overflow-y-auto'>
      <Sidebar>
        <Menu>
          <MenuItem
            className='menu-item rounded-md bg-white font-bold hover:border-0 hover:bg-blue-500 hover:text-blue-500'
            style={{ marginBottom: '4px' }}
          >
            <div className='flex items-center'>
              <SpaceDashboardOutlinedIcon fontSize='small' className='mr-2' />
              Boards
            </div>
          </MenuItem>
          <SubMenu
            label={
              <span className='menu-item rounded-md bg-white font-bold hover:border-0 hover:bg-blue-500 hover:text-blue-500'>
                <div className='flex items-center'>
                  <DashboardOutlinedIcon className='mr-2' fontSize='small' />
                  Templates
                </div>
              </span>
            }
            defaultOpen={true}
          >
            <MenuItem>Business</MenuItem>
            <MenuItem>Design</MenuItem>
            <MenuItem>Education</MenuItem>
            <MenuItem>Engineering</MenuItem>
            <MenuItem>Marketing</MenuItem>
            <MenuItem>HR & Operations</MenuItem>
            <MenuItem>Personal</MenuItem>
            <MenuItem>Productivity</MenuItem>
            <MenuItem>Product management</MenuItem>
            <MenuItem>Project management</MenuItem>
            <MenuItem>Remote work</MenuItem>
            <MenuItem>Sales</MenuItem>
            <MenuItem>Support</MenuItem>
            <MenuItem>Team management</MenuItem>
          </SubMenu>
          <MenuItem
            className='menu-item home border-b-3 rounded-md border-blue-500 bg-white font-bold hover:border-0 hover:bg-blue-500 hover:text-blue-500 '
            style={{ marginBottom: '4px' }}
          >
            <div className='flex items-center'>
              <HomeOutlinedIcon fontSize='small' className='mr-2' />
              Home
            </div>
          </MenuItem>
        </Menu>
      </Sidebar>
      <h1 className='mb-2 pl-5 pt-2 text-gray-700'>Workspaces</h1>
      <Sidebar className='workspaces mb-10'>
        <div>
          {workspace?.map((w, index) => (
            <div key={index}>
              <Menu>
                <SubMenu
                  label={
                    <span className='rounded-md bg-white font-bold hover:border-0 hover:bg-blue-500 hover:text-blue-500'>
                      <div className='flex items-center'>
                        <WorkspacesIcon fontSize='small' className='mr-2' />
                        {w.name}
                      </div>
                    </span>
                  }
                >
                  <MenuItem>
                    <div className='flex items-center'>
                      <SpaceDashboardOutlinedIcon fontSize='small' className='mr-2' />
                      Boards
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className='flex items-center'>
                      <FavoriteBorderOutlinedIcon fontSize='small' className='mr-2' />
                      Highlights
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className='flex items-center'>
                      <GridViewOutlinedIcon fontSize='small' className='mr-2' />
                      Views
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <PeopleAltOutlinedIcon fontSize='small' className='mr-2' />
                        Members
                      </div>
                      <div>
                        <Button>
                          <AddOutlinedIcon fontSize='small' />
                        </Button>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className='flex items-center'>
                      <SettingsIcon fontSize='small' className='mr-2' />
                      Setting
                    </div>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </div>
          ))}
        </div>
      </Sidebar>
    </div>
  )
}

export default SidebarTemplate
