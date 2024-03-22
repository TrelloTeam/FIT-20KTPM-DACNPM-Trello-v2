import React, { useEffect, useState } from 'react'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Box, Typography } from '@mui/material'
import {faTrello } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import { WorkspaceApiRTQ } from '~/api'
import {faChessBoard, faGear, faTableCells, faUserGroup, faHome } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from './Theme/themeContext'

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { darkMode, colors } = useTheme()

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleMouseEnter = (itemKey: string) => {
    setHoveredItem(itemKey);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  
  const menuItemsJSX = menuItems.map((item, index) => (
    <MenuItem
      key={index}
      style={{ 
        height: '32px', 
        backgroundColor: 
          hoveredItem === item ? colors.bg_button_hover :
          activeItem === item ? colors.bg_button_active_hover : colors.background,
      }}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => handleMouseEnter(item)}
      onMouseLeave={() => handleMouseLeave()}
    >
      {item}
    </MenuItem>
  ));

  const menuItemsWorkspaceJSX = menuItemsData.map((item, index) => (
    <MenuItem 
      key={index}
      style={{ 
        height: '32px', 
        backgroundColor: 
          hoveredItem === item.itemKey ? colors.bg_button_hover : 
          activeItem === item.itemKey ? colors.bg_button_active_hover : colors.background,
        transition: 'background-color 0.3s ease-in-out',
      }}
      onClick={() => handleItemClick(item.itemKey)}
      onMouseEnter={() => handleMouseEnter(item.itemKey)}
      onMouseLeave={() => handleMouseLeave()}
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
    <div className='detail-sidebar-container fixed pl-20 pt-2 max-h-80vh max-h-screen overflow-y-auto w-100px text-sm'>
      <Menu  style={{backgroundColor: colors.background, color: colors.text}}>
        <MenuItem
          className='menu-item rounded-md font-bold'
          style={{
            height: '32px', 
            backgroundColor: 
              hoveredItem === 'boards' ? colors.bg_button_hover :
              activeItem === 'boards' ? colors.bg_button_active_hover : colors.background
          }}
          onClick={() => handleItemClick('boards')}
          onMouseEnter={() => handleMouseEnter('boards')}
          onMouseLeave={() => handleMouseLeave()}
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
            <span className='menu-item rounded-md font-bold'>
              <Link to={'/template'}>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faChessBoard} fontSize='small' className='mr-2'/>
                  Templates
                </div>
              </Link>
            </span>
          }
          defaultOpen={true}
          style={{
            height: '32px',
            backgroundColor: 
              hoveredItem === 'templates' ? colors.bg_button_hover :
              activeItem === 'templates' ? colors.bg_button_active_hover : colors.background
          }}
          onClick={() => handleItemClick('templates')}
          onMouseEnter={() => handleMouseEnter('templates')}
          onMouseLeave={() => handleMouseLeave()}
        >
          {menuItemsJSX}
        </SubMenu>
        <MenuItem
          className='menu-item home border-b-3 rounded-md font-bold'
          style={{
            height: '32px',
            backgroundColor: 
              hoveredItem === 'home' ? colors.bg_button_hover :
              activeItem === 'home' ? colors.bg_button_active_hover : colors.background
        }}
          onClick={() => handleItemClick('home')}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={() => handleMouseLeave()}
        >
          <Link to={'/'}>
            <div className='flex items-center'>
            <FontAwesomeIcon icon={faHome} fontSize='small' className='mr-2'/>
              Home
            </div>
          </Link>
        </MenuItem>
      </Menu>
      <h2 
        className='my-2 pl-5 text-sm font-medium leading-6 text-ds-text overflow-hidden whitespace-nowrap'
        style={{color: colors.text}}
      >
        Workspaces
      </h2>
    
      <div 
        className='workspaces mb-10' 
        style={{backgroundColor: colors.background, color: colors.text}}
      >
        {workspaceData?.data?.owner.map((w, index) => (
          <div key={index}>
            <Menu>
              <SubMenu
                label={
                  <span className='rounded-md font-bold'>
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
                style={{ 
                  marginBottom: '4px',
                  height: '32px',
                  backgroundColor:
                    hoveredItem === 'workspace' ? colors.bg_button_hover : 
                    activeItem === 'workspace' ? colors.bg_button_active_hover : colors.background
                }}
                onClick={() => handleItemClick('workspace')}
                onMouseEnter={() => handleMouseEnter('workspace')}
                onMouseLeave={() => handleMouseLeave()}
              >
                <Link to={`/workspace/${w._id}`}>
                  <MenuItem 
                    style={{
                      height: '32px', 
                      backgroundColor: 
                        hoveredItem === 'board' ? colors.bg_button_hover : 
                        activeItem === 'board' ? colors.bg_button_active_hover : colors.background 
                    }}
                    onClick={() => handleItemClick('board')}
                    onMouseEnter={() => handleMouseEnter('board')}
                    onMouseLeave={() => handleMouseLeave()}
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
    </div>
  )
}

export default SidebarTemplate
