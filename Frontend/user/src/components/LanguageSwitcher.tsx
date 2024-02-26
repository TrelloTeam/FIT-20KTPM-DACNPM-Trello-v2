import { Button, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import flagEN from '~/assets/CountryFlags/gb.svg'
import flagVN from '~/assets/CountryFlags/vn.svg'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Button
          variant='contained'
          className='flex items-center justify-start'
          onClick={() => changeLanguage('en')}
          sx={{ width: 130, textTransform: 'none' }}
        >
          <img src={flagEN} className='mr-1 h-full max-h-6' />
          English
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant='contained'
          className='flex items-center'
          onClick={() => changeLanguage('vn')}
          sx={{ width: 130, textTransform: 'none' }}
        >
          <img src={flagVN} className='mr-1 h-full max-h-6' />
          Tiếng Việt
        </Button>
      </Grid>
    </Grid>
  )
}
