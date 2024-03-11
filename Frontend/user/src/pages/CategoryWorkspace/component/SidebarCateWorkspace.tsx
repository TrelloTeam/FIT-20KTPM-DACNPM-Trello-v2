import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TableViewIcon from '@mui/icons-material/TableView'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Button } from '@mui/base'
import { Divider, Drawer } from '@mui/material'

import SubMenuSetting from './subMenuSetting'
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

type SetterFunction = (value: boolean) => void

const handleMouseEnter = (setter: SetterFunction) => () => {
  setter(true)
}

const handleMouseLeave = (setter: SetterFunction) => () => {
  setter(false)
}

const SidebarCateWorkSpace: React.FC<Props> = ({ open, handleDrawerClose }) => {
  const theme = useTheme()

  const [isTableHovered, setIsTableHovered] = useState(false)
  const [isCalendarHovered, setIsCalendarHovered] = useState(false)
  const [isYourBoardHovered, setIsYourBoarHovered] = useState(false)
  const [isBoardHovered, setIsBoarHovered] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  const [isSubMenuSetting, setSubMenuSetting] = useState(false)

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const handleStarClick = () => {
    setIsStarred(!isStarred)
  }

  const handleToggleMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setSubMenuSetting(!isSubMenuSetting)
    const rect = event.currentTarget.getBoundingClientRect()
    setMenuPosition({ x: rect.right, y: rect.top })
  }

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
                <WorkspacesIcon fontSize='small' className='mr-5' />
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
            <MenuItem className='menu-item rounded-md'>
              <div className='flex items-center'>
                <SpaceDashboardOutlinedIcon fontSize='small' className='mr-2' />
                Boards
              </div>
            </MenuItem>
            <MenuItem>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  <PeopleAltOutlinedIcon fontSize='small' className='mr-2' />
                  Members
                </div>
                <div>
                  <Button className='w-9'>
                    <AddOutlinedIcon className='ml-auto rounded-md hover:bg-gray-300' fontSize='small' />
                  </Button>
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={handleToggleMenu}>
              <div className='flex items-center'>
                <SettingsIcon fontSize='small' className='mr-2' />
                <div className='font-bold'>Workspace settings</div>
                <KeyboardArrowDownIcon fontSize='small' className='ml-auto' />
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
                onMouseEnter={handleMouseEnter(setIsTableHovered)}
                onMouseLeave={handleMouseLeave(setIsTableHovered)}
              >
                <div className='flex items-center'>
                  <TableViewIcon fontSize='small' className='mr-2' />
                  Table
                  {isTableHovered && <MoreHorizIcon fontSize='small' className='ml-auto hover:bg-gray-300' />}
                </div>
              </MenuItem>

              <MenuItem
                className='menu-item'
                onMouseEnter={handleMouseEnter(setIsCalendarHovered)}
                onMouseLeave={handleMouseLeave(setIsCalendarHovered)}
              >
                <div className='flex items-center'>
                  <CalendarMonthIcon fontSize='small' className='mr-2' />
                  Calendar
                  {isCalendarHovered && <MoreHorizIcon fontSize='small' className='ml-auto hover:bg-gray-300' />}
                </div>
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>

        <div
          className='flex w-full items-center justify-between'
          onMouseEnter={handleMouseEnter(setIsYourBoarHovered)}
          onMouseLeave={handleMouseLeave(setIsYourBoarHovered)}
        >
          <h1 className='mb-2 flex items-center pl-5 font-bold text-gray-700'>Your boards</h1>
          {isYourBoardHovered && <MoreHorizIcon fontSize='small' className='ml-auto hover:bg-gray-300' />}
          <div>
            <Button>
              <AddOutlinedIcon className='rounded-md hover:bg-gray-300' fontSize='small' />
            </Button>
          </div>
        </div>

        <Sidebar className='workspaces mb-10 text-sm'>
          <div>
            <Menu>
              <MenuItem
                className='menu-item'
                onMouseEnter={handleMouseEnter(setIsBoarHovered)}
                onMouseLeave={handleMouseLeave(setIsBoarHovered)}
              >
                <div className='flex items-center'>
                  <WorkspacesIcon fontSize='small' className='mr-2' />
                  Project
                  {isBoardHovered && (
                    <>
                      <MoreHorizIcon fontSize='small' className='ml-auto hover:bg-gray-300' />
                      {isStarred ? (
                        <StarIcon fontSize='small' className='ml-2 hover:bg-gray-300' onClick={handleStarClick} />
                      ) : (
                        <StarBorderIcon fontSize='small' className='ml-2 hover:bg-gray-300' onClick={handleStarClick} />
                      )}
                    </>
                  )}
                </div>
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>
      </Drawer>

      {isSubMenuSetting && (
        <div style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x }}>
          <SubMenuSetting />
        </div>
      )}
    </div>
  )
}

export default SidebarCateWorkSpace
