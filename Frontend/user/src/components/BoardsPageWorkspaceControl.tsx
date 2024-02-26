import { Box, Button, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import GridViewIcon from '@mui/icons-material/GridView'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { colors } from '../styles/index'
import { useTranslation } from 'react-i18next'

export default function BoardsPageWorkspaceControl() {
  const { t } = useTranslation()
  const buttonColor = 'rgba(9, 30, 66, 0.03)'
  const buttonColorHover = 'rgba(9, 30, 66, 0.15)'

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} className='flex items-center justify-end'>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<FontAwesomeIcon icon={faTrello} />}
            sx={{
              width: '100%',
              backgroundColor: buttonColor,
              color: colors.primary,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: buttonColorHover
              }
            }}
          >
            {t('Boards')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<GridViewIcon />}
            sx={{
              width: '100%',
              backgroundColor: buttonColor,
              color: colors.primary,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: buttonColorHover
              }
            }}
          >
            {t('Views')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<Person2OutlinedIcon />}
            sx={{
              width: '100%',
              backgroundColor: buttonColor,
              color: colors.primary,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: buttonColorHover
              }
            }}
          >
            {t('Members')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size='small'
            variant='contained'
            startIcon={<SettingsOutlinedIcon />}
            sx={{
              width: '100%',
              backgroundColor: buttonColor,
              color: colors.primary,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: buttonColorHover
              }
            }}
          >
            {t('Settings')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
