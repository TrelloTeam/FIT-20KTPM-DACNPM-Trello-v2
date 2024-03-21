import { Box, Card, Stack, Typography } from '@mui/material'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { CiMobile2 } from 'react-icons/ci'
import { MdOutlineEmail } from 'react-icons/md'
import { useTheme } from '../Theme/themeContext'

export default function Automation() {
  const { darkMode, colors } = useTheme()
  return (
    <Box
      sx={{
        width: '304px',
        bgcolor: colors.backgroundSecond
      }}
    >
      <Box>
        <h3 className='flex justify-center' style={{color: colors.text}}>Automation</h3>
      </Box>
      <Box>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            bgcolor: colors.backgroundSecond,
            color: colors.text,
            boxShadow: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            '&:hover': {
              bgcolor: 'rgba(72, 72, 78, 0.3)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <HiOutlineAdjustmentsHorizontal className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                Rules
              </Typography>
            </Stack>
            <Typography color={colors.text} variant='body2' sx={{ fontSize: '13px' }}>
              Create rules that automatically respond to actions, schedules, or a card's due date.
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            bgcolor: colors.backgroundSecond,
            color: colors.text,
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(72, 72, 78, 0.3)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <CiMobile2 className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                Buttons
              </Typography>
            </Stack>
            <Typography color={colors.text} variant='body2' sx={{ fontSize: '13px' }}>
              Create custom buttons on the back of every card or at the top of the board.
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            width: '100%',
            border: 'none',
            bgcolor: colors.backgroundSecond,
            color: colors.text,
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(72, 72, 78, 0.3)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction='row' alignItems='center'>
              <MdOutlineEmail className='mr-1' />
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px' }}>
                Email reports
              </Typography>
            </Stack>
            <Typography color={colors.text} variant='body2' sx={{ fontSize: '13px' }}>
              Set up email reports, such as a weekly summary of all cards that are due within 7 days.
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
