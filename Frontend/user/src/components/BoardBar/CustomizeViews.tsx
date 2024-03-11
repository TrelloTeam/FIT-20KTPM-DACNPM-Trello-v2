import { Box, Checkbox, FormGroup } from '@mui/material'
import GroupTrelloIcon from '~/assets/GroupTrelloIcon.svg'
import { CiViewTable } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { MdOutlineViewTimeline } from 'react-icons/md'

export default function CustomizeViews() {
  return (
    <Box
      sx={{
        width: '304px',
        bgcolor: 'background.paper'
      }}
    >
      <Box>
        <h3 className='flex justify-center'>Upgrade for veiws</h3>
      </Box>
      <Box>
        <FormGroup>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(54, 55, 61, 0.2)'
              }
            }}
          >
            <Checkbox />
            <img src={GroupTrelloIcon} alt='NavBarIcon' className='mr-2 h-4 w-4 rounded-md' />
            <p className='font-normal'>Board</p>
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(54, 55, 61, 0.2)'
              }
            }}
          >
            <Checkbox />
            <CiViewTable className='mr-2 text-lg font-semibold' />
            <p className='font-normal'>Table</p>
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(54, 55, 61, 0.2)'
              }
            }}
          >
            <Checkbox />
            <SlCalender className='mr-2 text-lg font-semibold' />
            <p className='font-normal'>Calender</p>
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'rgba(54, 55, 61, 0.2)'
              }
            }}
          >
            <Checkbox />
            <MdOutlineViewTimeline className='mr-2 text-lg font-semibold' />
            <p className='font-normal'>TimeLine</p>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  )
}
