import { Box, Button, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import GridViewIcon from '@mui/icons-material/GridView'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { colors } from '../../../styles/index'

export default function BoardsPageWorkspaceControl() {
  const buttonColor = 'rgba(9, 30, 66, 0.06)'

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<FontAwesomeIcon icon={faTrello} />}
            sx={{ width: '100%', backgroundColor: buttonColor, color: colors.primary, textTransform: 'none' }}
          >
            Boards
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<GridViewIcon />}
            sx={{ width: '100%', backgroundColor: buttonColor, color: colors.primary, textTransform: 'none' }}
          >
            Views
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<Person2OutlinedIcon />}
            sx={{ width: '100%', backgroundColor: buttonColor, color: colors.primary, textTransform: 'none' }}
          >
            Members
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<SettingsOutlinedIcon />}
            sx={{ width: '100%', backgroundColor: buttonColor, color: colors.primary, textTransform: 'none' }}
          >
            Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
