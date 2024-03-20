import { Box, Card, Stack, Typography } from '@mui/material'
import { MdOutlineLock } from 'react-icons/md'
import { MdGroups2 } from 'react-icons/md'
import { MdPublic } from 'react-icons/md'

export default function ChangeVisibility() {
  return (
    <Box
      sx={{
        width: '384px',
        bgcolor: 'background.paper'
      }}
    >
      <Box>
        <h3 className='flex justify-center'>Change Visibility</h3>
      </Box>
      <Box>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            '&:hover': {
              bgcolor: 'rgba(54, 55, 61, 0.2)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <MdOutlineLock className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                Private
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='body2' sx={{ fontSize: '13px' }}>
              Only board members can see and edit this board.
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(54, 55, 61, 0.2)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <MdGroups2 className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                WorkSpace
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='body2' sx={{ fontSize: '13px' }}>
              Only board members can see and edit this board.
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(54, 55, 61, 0.2)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <MdPublic className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                Public
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='body2' sx={{ fontSize: '13px' }}>
              Only board members can see and edit this board.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
