import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { useState } from 'react'
import { colors, colorsButton } from '~/styles'

interface DateTimeTitleProps {
  startDate: string
  endDate: string
  time: string
}

function DateTimeTitle({ startDate, endDate, time }: DateTimeTitleProps) {
  return (
    <p className='text-sm font-semibold'>
      {startDate} - {endDate} at {time}
    </p>
  )
}

interface StatusTagProps {
  isComplete: boolean
}

function StatusTag({ isComplete }: StatusTagProps) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 16,
        padding: '0 4px',
        bgcolor: isComplete ? '#008000' : '#fff0f5',
        color: isComplete ? '#fff' : '#f00'
      }}
      className='flex items-center justify-center rounded text-sm font-semibold'
    >
      <p>{isComplete ? 'Complete' : 'Overdue'}</p>
    </Box>
  )
}

export default function CardDate() {
  const [isComplete, setIsComplete] = useState(false)

  function handleCheckboxClick() {
    setIsComplete(!isComplete)
  }

  return (
    <Box sx={{ margin: '10px 20px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Dates
      </h2>
      <Box className='flex flex-row gap-2'>
        <input type='checkbox' className='cursor-pointer' onClick={handleCheckboxClick} />
        <Box
          sx={{
            boxsizing: 'content-box',
            width: 'fit-content',
            height: 32,
            bgcolor: colorsButton.secondary,
            padding: '0px 12px 0 12px',
            color: colors.primary,
            '&:hover': {
              bgcolor: colorsButton.secondary_hover
            }
          }}
          className='flex cursor-pointer flex-row flex-wrap items-center gap-2 rounded'
        >
          <DateTimeTitle startDate='Feb 23' endDate='Mar 6' time='11:00 PM' />
          <Box
            sx={{ width: 'fit-content', height: 24, color: colors.primary }}
            className='flex items-center justify-center gap-2 text-sm'
          >
            <StatusTag isComplete={isComplete} />
            <FontAwesomeIcon icon={faChevronDown} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
