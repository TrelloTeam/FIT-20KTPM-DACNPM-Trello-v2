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
      <Box className='mb-1'>
        <h3 className='flex justify-center text-[#44546F]'>Upgrade for veiws</h3>
      </Box>
      <Box>
        <FormGroup>
          <Box
            sx={{
              color: '#44546F',
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
            <p className='font-normal text-gray-700 '>Board</p>
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
            <CiViewTable className='mr-2 text-lg font-semibold text-black' />
            <p className='font-normal text-gray-700'>Table</p>
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
            <SlCalender className='mr-2 text-lg font-semibold text-black' />
            <p className='font-normal text-gray-700'>Calender</p>
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
            <MdOutlineViewTimeline className='mr-2 text-lg font-black text-black' />
            <p className='font-normal text-gray-700'>TimeLine</p>
          </Box>
        </FormGroup>
      </Box>
    </Box>
  )
}
