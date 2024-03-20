import { Box, Checkbox, FormGroup } from '@mui/material'
import GroupTrelloIcon from '~/assets/GroupTrelloIcon.svg'
import { CiViewTable } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { MdOutlineViewTimeline } from 'react-icons/md'
import { useTheme } from '../Theme/themeContext'

export default function CustomizeViews() {
  const { darkMode, colors } = useTheme()
  return (
    <Box
      sx={{
        width: '304px',
        bgcolor: colors.backgroundSecond
      }}
    >
      <Box className='mb-1' sx={{color: colors.text}}>
        <h3 className='flex justify-center'>Upgrade for veiws</h3>
      </Box>
      <Box>
        <FormGroup>
          <Box
            sx={{
              color: colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',              
              '&:hover': {
                bgcolor: 'rgba(72, 72, 78, 0.3)'
              }
            }}
          >
            <Checkbox sx={{color: colors.text}}  />
            <img src={GroupTrelloIcon} alt='NavBarIcon' color={colors.text} className='mr-2 h-4 w-4 rounded-md' style={{color: colors.text, backgroundColor: colors.text}} />
            <p className='font-normal  '>Board</p>
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(72, 72, 78, 0.3)'
              }
            }}
          >
            <Checkbox sx={{color: colors.text}} />
            <CiViewTable color={colors.text} className='mr-2 text-lg font-semibold text-black' />
            <p className='font-normal' style={{color: colors.text}}>Table</p>
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(72, 72, 78, 0.3)'
              }
            }}
          >
            <Checkbox sx={{color: colors.text}} />
            <SlCalender color={colors.text} className='mr-2 text-lg font-semibold text-black' />
            <p className='font-normal' style={{color: colors.text}}>Calender</p>
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(72, 72, 78, 0.3)'
              }
            }}
          >
            <Checkbox sx={{color: colors.text}} />
            <MdOutlineViewTimeline color={colors.text} className='mr-2 text-lg font-black text-black' />
            <p className='font-normal' style={{color: colors.text}}>TimeLine</p>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  )
}
