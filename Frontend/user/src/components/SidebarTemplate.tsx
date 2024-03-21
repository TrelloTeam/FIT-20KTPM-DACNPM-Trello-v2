import React, { useEffect, useState } from 'react'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Box, Typography } from '@mui/material'
import {faTrello } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { WorkspaceApiRTQ } from '~/api'
import {faChessBoard, faGear, faTableCells, faUserGroup, faHome } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const menuItems = [
  'Business',
  'Design',
  'Education',
  'Engineering',
  'Marketing',
  'HR & Operations',
  'Personal',
  'Productivity',
  'Product management',
  'Project management',
  'Remote work',
  'Sales',
  'Support',
  'Team management'
];

const menuItemsData = [
  { text: 'Highlights', icon: faHeart, itemKey: 'highlights' },
  { text: 'Views', icon: faTableCells, itemKey: 'views' },
  { text: 'Members', icon: faUserGroup, itemKey: 'members' },
  { text: 'Setting', icon: faGear, itemKey: 'setting' }
];

function SidebarTemplate() {
  const [getALlWorkspace, { data: workspaceData }] = WorkspaceApiRTQ.WorkspaceApiSlice.useLazyGetAllWorkspaceQuery()

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  
  const menuItemsJSX = menuItems.map((item, index) => (
    <MenuItem
      key={index}
      style={{ height: '35px', backgroundColor: activeItem === item ? '#d3d3d3' : '' }}
      onClick={() => handleItemClick(item)}
    >
      {item}
    </MenuItem>
  ));

  const menuItemsWorkspaceJSX = menuItemsData.map((item, index) => (
    <MenuItem 
      key={index}
      style={{ height: '35px', backgroundColor: activeItem === item.itemKey ? '#d3d3d3' : '' }}
      onClick={() => handleItemClick(item.itemKey)}
    >
      <div className='flex items-center'>
        <FontAwesomeIcon icon={item.icon} fontSize='small' className='mr-2'/>
        {item.text}
      </div>
    </MenuItem>
  ));

  React.useEffect(() => {
    getALlWorkspace().then((v) => console.log(v))
  }, [])

  return (
    <div className='detail-sidebar-container fixed ml-20 mt-2 max-h-80vh max-h-screen overflow-y-auto w-100px text-sm'>
      <Sidebar>
        <Menu>
          <MenuItem
            className='menu-item rounded-md bg-white font-bold hover:border-0 hover:text-blue-500'
            style={{ marginBottom: '4px', height: '35px' , backgroundColor: activeItem === 'boards' ? '#d3d3d3' : ''}}
            onClick={() => handleItemClick('boards')}
          >
            <Link to={'/workspace/1'}>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faTrello} fontSize='small' className='mr-2'/>
                Boards
              </div>
            </Link>
          </MenuItem>
          <SubMenu
            label={
              <span className='menu-item rounded-md bg-white font-bold hover:border-0 hover:text-blue-500'>
                <Link to={'/template'}>
                  <div className='flex items-center'>
                    <FontAwesomeIcon icon={faChessBoard} fontSize='small' className='mr-2'/>
                    Templates
                  </div>
                </Link>
              </span>
            }
            defaultOpen={true}
            style={{ marginBottom: '4px', height: '35px' , backgroundColor: activeItem === 'templates' ? '#d3d3d3' : ''}}
            onClick={() => handleItemClick('templates')}
          >
            {menuItemsJSX}
          </SubMenu>
          <MenuItem
            className='menu-item home border-b-3 rounded-md border-blue-500 bg-white font-bold hover:border-0 hover:text-blue-500 '
            style={{ marginBottom: '4px', height: '35px' , backgroundColor: activeItem === 'home' ? '#d3d3d3' : ''}}
            onClick={() => handleItemClick('home')}
          >
            <Link to={'/'}>
              <div className='flex items-center'>
              <FontAwesomeIcon icon={faHome} fontSize='small' className='mr-2'/>
                Home
              </div>
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
      <h2 className='my-2 pl-5 text-sm font-medium leading-6 text-ds-text overflow-hidden whitespace-nowrap'>
          Workspaces
      </h2>
      <Sidebar className='workspaces mb-10'>
        <div>
          {workspaceData?.data?.owner.map((w, index) => (
            <div key={index}>
              <Menu>
                <SubMenu
                  label={
                    <span className='rounded-md font-bold hover:border-0 hover:bg-blue-500 hover:text-blue-500'>
                      <div className='flex items-center'>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        <Typography
                          variant='h4'
                          sx={{
                            display: 'inline-block',
                            fontSize: '20px',
                            fontWeight: 700,
                            padding: '8px 14px',
                            borderRadius: '6px',
                            backgroundImage: 'linear-gradient(to bottom, #E774BB, #943D73)'
                          }}
                        >
                          Â
                        </Typography>
                      </Box>
                        {w.name}
                      </div>
                    </span>
                  }
                  style={{ marginBottom: '4px', height: '35px' , backgroundColor: activeItem === 'workspace' ? '#d3d3d3' : ''}}
                  onClick={() => handleItemClick('workspace')}
                >
                  <Link to={`/workspace/${w._id}`}>
                    <MenuItem 
                      style={{ height: '35px', backgroundColor: activeItem === 'board' ? '#d3d3d3' : '' }}
                      onClick={() => handleItemClick('board')}
                    >
                      <div className='flex items-center'>
                        <FontAwesomeIcon icon={faTrello} fontSize='small' className='mr-2'/>
                        Boards
                      </div>
                    </MenuItem>
                  </Link>
                  {menuItemsWorkspaceJSX}
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
