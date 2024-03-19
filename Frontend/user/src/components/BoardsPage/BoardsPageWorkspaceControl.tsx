import { Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import GridViewIcon from '@mui/icons-material/GridView'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { useTheme } from '../Theme/themeContext'

export default function BoardsPageWorkspaceControl() {
  const { colors } = useTheme()
  return (
    <Box className='flex flex-row items-center'>
      <Box
        sx={{
          width: 'fit-content',
          height: 32,
          backgroundColor: colors.button,
          '&:hover': { backgroundColor: colors.button_hover },
          color: colors.text,
          textTransform: 'none',
          padding: '0 12px',
          marginRight: '12px',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.4)'
        }}
        className='flex cursor-pointer items-center justify-center rounded-md'
      >
        <FontAwesomeIcon icon={faTrello} style={{ fontSize: 16, marginRight: '8px' }} />
        <p style={{ fontSize: 14 }} className='font-semibold'>
          Boards
        </p>
      </Box>
      <Box
        sx={{
          width: 'fit-content',
          height: 32,
          backgroundColor: colors.button,
          '&:hover': { backgroundColor: colors.button_hover },
          color: colors.text,
          textTransform: 'none',
          padding: '0 12px',
          marginRight: '12px',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.4)'
        }}
        className='flex cursor-pointer items-center justify-center rounded-md'
      >
        <GridViewIcon style={{ fontSize: 18, marginRight: '8px' }} />
        <p style={{ fontSize: 14 }} className='font-semibold'>
          Views
        </p>
      </Box>
      <Box
        sx={{
          width: 'fit-content',
          height: 32,
          backgroundColor: colors.button,
          '&:hover': { backgroundColor: colors.button_hover },
          color: colors.text,
          textTransform: 'none',
          padding: '0 12px',
          marginRight: '12px',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.4)'
        }}
        className='flex cursor-pointer items-center justify-center rounded-md'
      >
        <Person2OutlinedIcon style={{ fontSize: 18, marginRight: '8px' }} />
        <p style={{ fontSize: 14 }} className='font-semibold'>
          Members
        </p>
      </Box>
      <Box
        sx={{
          width: 'fit-content',
          height: 32,
          backgroundColor: colors.button,
          '&:hover': { backgroundColor: colors.button_hover },
          color: colors.text,
          textTransform: 'none',
          padding: '0 12px 0 8px',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.4)'
        }}
        className='flex cursor-pointer items-center justify-center rounded-md'
      >
        <SettingsOutlinedIcon style={{ fontSize: 18, marginRight: '8px' }} />
        <p style={{ fontSize: 14 }} className='font-semibold'>
          Settings
        </p>
      </Box>
    </Box>
  )
}
