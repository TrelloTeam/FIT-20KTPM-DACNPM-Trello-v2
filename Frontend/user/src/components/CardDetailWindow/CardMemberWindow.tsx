import { Box, Popover } from '@mui/material'
import { colors } from '~/styles'

export default function CardMemberWindow() {
  return (
    <div>
      <Popover
        open={false}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box className='flex items-center justify-center'>
          <p style={{ color: colors.primary }} className='text-md font-semibold'>
            Members
          </p>
        </Box>
      </Popover>
    </div>
  )
}
