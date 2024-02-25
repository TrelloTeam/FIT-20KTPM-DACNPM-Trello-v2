import { Box, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import WorkSpaces from './menu/workspaces'
import Recent from './menu/recent'
import Starred from './menu/starred'
import Templates from './menu/template'
import Create from './menu/create'
import SearchMenu from './menu/search'
import Help from './menu/help'
import Notification from './menu/notification'
import Account from './menu/account'

const Header = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        backgroundColor: '#1d2125',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '1px',
        borderColor: '#9fadbc',
        borderStyle: 'solid',
        padding: '8px',
        color: '#9fadbc',
        zIndex: '1000'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '2px',
            padding: '2px 8px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }
          }}
        >
          <FontAwesomeIcon icon={faTrello} />

          <Typography variant='body1' sx={{ fontSize: '20px', fontWeight: 700, marginLeft: '4px' }}>
            Trello
          </Typography>
        </Box>

        <Box sx={{ padding: '0 5px' }}>
          <WorkSpaces />
        </Box>

        <Box sx={{ padding: '0 5px' }}>
          <Recent />
        </Box>

        <Box sx={{ padding: '0 5px' }}>
          <Starred />
        </Box>

        <Box sx={{ padding: '0 5px' }}>
          <Templates />
        </Box>

        <Create />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchMenu />
        <Notification />
        <Help />
        <Account />
      </Box>
    </Box>
  )
}

export default Header
