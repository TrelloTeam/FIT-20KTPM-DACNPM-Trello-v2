import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import {faTrello } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear, faUserGroup, faTableCellsLarge, faTableColumns } from '@fortawesome/free-solid-svg-icons'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Divider, Drawer } from '@mui/material'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'

const drawerWidth = 250

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  marginTop: 12
}))

interface Props {
  open: boolean
  handleDrawerClose: () => void
}

const SidebarCateWorkSpace: React.FC<Props> = ({ open, handleDrawerClose }) => {
  const theme = useTheme()

  return (
    <div className='sidebar-cate-workspace'>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '53px'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <div className='flex items-center'>
            <span className='rounded-md bg-white font-bold'>
              <div className='flex items-center text-sm'>
                <WorkspacesIcon fontSize='small' className='ml-2 mr-5' />
                <div>
                  Âu Hồng Minh's workspace
                  <div className='text-xs font-normal'>Free</div>
                </div>
              </div>
            </span>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Sidebar className='text-sm'>
          <Menu>
            <MenuItem className='menu-item rounded-md' style={{ height: '40px',  }}>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faTrello} fontSize='small' className='mr-2'/>
                Boards
              </div>
            </MenuItem>
            <MenuItem style={{ height: '40px'}}>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faUserGroup} fontSize='small' className='mr-2'/>
                  Members
                </div>
              </div>
            </MenuItem>
            <MenuItem style={{ height: '40px'}}>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faGear} fontSize='small' className='mr-2'/>
                <div>Workspace settings</div>
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>

        <h1 className='mb-2 pl-5 pt-2 font-bold text-gray-700'>Workspaces</h1>
        <Sidebar className='workspaces text-sm'>
          <div>
            <Menu>
              <MenuItem
                className='menu-item'
                style={{ height: '40px'}}
              >
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faTableCellsLarge} fontSize='small' className='mr-2'/>
                  Table
                </div>
              </MenuItem>

              <MenuItem
                className='menu-item'
                style={{ height: '40px'}}
              >
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarDays} fontSize='small' className='mr-2'/>
                  Calendar
                </div>
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>

        <div
          className='flex w-full items-center justify-between'
        >
          <h1 className='mb-2 flex items-center pl-5 font-bold text-gray-700'>Your boards</h1>
        </div>

        <Sidebar className='workspaces mb-10 text-sm'>
          <div>
            <Menu>
              <MenuItem
                className='menu-item'
                style={{ height: '40px'}}
              >
                <div className='flex items-center'>
                <FontAwesomeIcon icon={faTableColumns} fontSize='small' className='mr-2'/>
                  Project
                </div>
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>
      </Drawer>
    </div>
  )
}

export default SidebarCateWorkSpace
