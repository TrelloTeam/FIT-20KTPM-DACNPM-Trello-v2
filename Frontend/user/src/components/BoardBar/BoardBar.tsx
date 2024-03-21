import { Avatar, AvatarGroup, Box, Chip, Drawer } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { MdOutlineLock } from 'react-icons/md'
import GroupTrelloIcon from '~/assets/GroupTrelloIcon.svg'
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup'
import * as React from 'react'
import { useState } from 'react'
import ChangeVisibility from './ChangeVisibility'
import CustomizeViews from './CustomizeViews'
import Automation from './Automation'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Filter from './Filter'
import { useTheme } from '../Theme/themeContext'
import More from './MoreMenu'
//pop up

const Menu_Style = {
  color: 'white',
  fontSize: '18px',
  bgcolor: 'rgba(54, 55, 61, 0.1)',
  // paddingX: '5px',
  fontWeight: 'bold',
  borderRadius: '8px',
  marginRight: '3px',
  height: '32px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'rgba(160, 160, 160, 0.25)'
  }
}

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      width: 24,
      height: 24,
      fontSize: '14px',
      '&:hover': {
        bgcolor: 'primary.90',
        cursor: 'pointer'
      },
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

function BoardBar() {
  const { darkMode, colors } = useTheme()
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)
  const [popupContent, setPopupContent] = useState(<div>Hello kien</div>)
  const [openMenu, setOpenMenu] = React.useState(false)
  const toggleDrawer = (newOpen) => () => {
    setOpenMenu(newOpen)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>, customPopupContent: JSX.Element) => {
    setPopupContent(customPopupContent)
    console.log(popupContent)
    setAnchor(anchor ? null : event.currentTarget)
  }

  const open = Boolean(anchor)
  const id = open ? 'simple-popup' : undefined

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
          <Chip sx={Menu_Style} icon={<DashboardIcon />} label='Project Trello' onClick={() => {}} />
          <Tooltip title='Click to star or unstar this board'>
            <Chip
              sx={{
                width: '32px',
                height: '32px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                bgcolor: 'rgba(54, 55, 61, 0)',
                borderRadius: '8px',
                paddingLeft: '12px',
                marginRight: '4px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={
                <StarBorderIcon
                  sx={{
                    fontSize: '18px',
                    '&:hover': {
                      color: '#FF991F',
                      fontSize: '20px'
                    }
                  }}
                />
              }
              onClick={() => {}}
            />
          </Tooltip>

          <Tooltip title='Change visibility'>
            <Chip
              sx={{
                fontSize: '16px',
                bgcolor: 'rgba(54, 55, 61, 0.1)',
                position: 'relative',
                // paddingLeft: '10px',
                borderRadius: '8px',
                marginRight: '4px',
                height: '32px',
                width: '32px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={<MdOutlineLock color='white' className='absolute left-[3px]' />}
              onClick={(e) => handleClick(e, <ChangeVisibility />)}
            />
          </Tooltip>

          <Tooltip title='Board'>
            <Chip
              sx={{
                color: '#324462',
                fontWeight: '500',
                paddingX: '6px',
                fontSize: '14px',
                marginRight: '4px',
                bgcolor: '#DFE1E6',
                borderRadius: '3px',
                height: '32px',
                '& .MuiSvgIcon-root': {
                  color: ''
                },
                '&:hover': {
                  bgcolor: '#F1F2F4'
                }
              }}
              icon={<img src={GroupTrelloIcon} alt='NavBarIcon' className='h-4 w-4 rounded-md' />}
              label='Board'
              onClick={() => {}}
            />
          </Tooltip>

          <Tooltip title='Customize views'>
            <Chip
              sx={{
                color: '#cccc',
                fontSize: '18px',
                bgcolor: 'rgba(54, 55, 61, 0.1)',
                paddingLeft: '12px',
                fontWeight: 'bold',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                marginRight: '2px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={
                <ExpandMoreIcon
                  sx={{
                    fontSize: '18px',
                    '&:hover': {
                      fontSize: '20px'
                    }
                  }}
                />
              }
              onClick={(e) => handleClick(e, <CustomizeViews />)}
            />
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2' }}>
          <Tooltip title='Automations'>
            <Chip
              sx={{
                color: '#cccc',
                fontSize: '18px',
                bgcolor: 'rgba(54, 55, 61, 0.1)',
                paddingLeft: '12px',
                fontWeight: 'bold',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                marginRight: '2px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={
                <BoltIcon
                  sx={{
                    fontSize: '18px',
                    '&:hover': {
                      fontSize: '20px'
                    }
                  }}
                />
              }
              onClick={(e) => handleClick(e, <Automation />)}
            />
          </Tooltip>

          <Tooltip title='Filter'>
            <Chip
              sx={{
                color: '#cccc',
                fontSize: '14px',
                bgcolor: 'rgba(54, 55, 61, 0.1)',
                // paddingX: '5px',
                fontWeight: 'bold',
                borderRadius: '8px',
                marginRight: '3px',
                height: '32px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={
                <FilterListIcon
                  sx={{
                    fontSize: '18px'
                  }}
                />
              }
              label='Filters'
              onClick={(e) => handleClick(e, <Filter />)}
            />
          </Tooltip>

          <AvatarGroup
            max={5}
            sx={{
              marginRight: '5px',
              '& .MuiAvatar-root': {
                width: '24px',
                height: '24px',
                fontSize: '14px',
                padding: '2px',
                marginRight: '5px',
                border: 'none'
              },
              padding: '0'
            }}
          >
            <Tooltip title='Trung kien'>
              <Avatar {...stringAvatar('Nguyen Trung Kien')} />
            </Tooltip>
            <Tooltip title='Hữu Chính'>
              <Avatar {...stringAvatar('Hữu Chính')} />
            </Tooltip>
            <Tooltip title='Bảo Long'>
              <Avatar {...stringAvatar('Bảo Long')} />
            </Tooltip>
            <Tooltip title='Trung kien'>
              <Avatar {...stringAvatar('Trung Kien')} />
            </Tooltip>
            <Tooltip title='Trung kien'>
              <Avatar {...stringAvatar('Trung Kien')} />
            </Tooltip>
            <Tooltip title='Trung kien'>
              <Avatar {...stringAvatar('Trung Kien')} />
            </Tooltip>
            <Tooltip title='Bảo Long'>
              <Avatar {...stringAvatar('Bảo Long')} />
            </Tooltip>
          </AvatarGroup>

          <Tooltip title='More'>
            <Chip
              sx={{
                color: '#cccc',
                fontSize: '18px',
                bgcolor: 'rgba(54, 55, 61, 0.1)',
                paddingLeft: '12px',
                fontWeight: 'bold',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: 'rgba(160, 160, 160, 0.25)'
                }
              }}
              icon={
                <MoreHorizIcon
                  sx={{
                    fontSize: '18px',
                    '&:hover': {
                      fontSize: '20px'
                    }
                  }}
                />
              }
              onClick={() => {setOpenMenu(true)}}
            />
          </Tooltip>
        </Box>
      </Box>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        placement={'bottom-start'}
        disablePortal
        className={`z-50 mt-2 rounded-lg border border-solid border-slate-200 bg-white p-3 font-sans text-sm font-medium shadow-md ${darkMode ? 'dark:bg-[#282E33]' : ''}`}
      >
        {popupContent}
      </BasePopup>
      <Drawer open={false} sx={{ position: 'relative', bgcolor:colors.backgroundSecond, color: colors.text }} anchor='right' onClose={toggleDrawer(false)}>
        {<More />}
      </Drawer>
    </>
  )
}

export default BoardBar
