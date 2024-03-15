import { useState } from 'react'
import { _Card } from '..'
import { Box, FormControl, Grid, MenuItem, Popover, Select, SelectChangeEvent } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { colors, colorsButton } from '~/styles'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

const reminderDateChoices: string[] = [
  'None',
  'At time of due date',
  '5 Minutes before',
  '10 Minutes before',
  '15 Minutes before',
  '1 Hour before',
  '2 Hours before',
  '1 Day before',
  '2 Days before'
]

interface SelectCardDatesModalProps {
  anchorEl: (EventTarget & HTMLDivElement) | null
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  handleClose: () => void
}

export function SelectCardDatesModal({
  anchorEl,
  currentCard,
  setCurrentCard,
  handleClose
}: SelectCardDatesModalProps) {
  const menuItemFontSize = 14
  const [startDateEnabled, setStartDateEnabled] = useState(true)
  const [dueDateEnabled, setDueDateEnabled] = useState(true)
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(dayjs())
  const [dueDateValue, setDueDateValue] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [reminderDateValue, setReminderDateValue] = useState('None')

  function handleSelectStartDate(startDate: Dayjs) {
    setStartDateValue(startDate)
    if (startDate.isAfter(dueDateValue)) {
      setDueDateValue(startDate.add(1, 'day'))
    }
  }

  function handleSelectDueDate(dueDate: Dayjs) {
    setDueDateValue(dueDate)
    if (dueDate.isBefore(startDateValue)) {
      setStartDateValue(dueDate.subtract(1, 'day'))
    }
  }

  function handleSelectReminderDate(event: SelectChangeEvent) {
    setReminderDateValue(event.target.value as string)
  }

  function updateCardDates() {
    const updatedCard = {
      ...currentCard,
      dates: {
        ...currentCard.dates,
        start_date: startDateEnabled ? startDateValue! : null,
        due_date: dueDateEnabled ? dueDateValue! : null
      }
    }
    setCurrentCard(updatedCard)
  }

  return (
    <Popover
      open={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={handleClose}
      sx={{ margin: '8px 0 0 0' }}
    >
      <Box
        sx={{ width: 300, height: 'fit-content', margin: '0 8px', padding: '8px 0px', color: colors.primary }}
        className='flex flex-col'
      >
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '0 0 8px 0' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Dates</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        <Box sx={{ width: '100%', height: 20 }}></Box>
        {/* START: Select card dates */}
        <p style={{ margin: '0 0 12px 0', color: colors.primary }} className='text-xs font-bold'>
          Select dates
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
            {/* Select start date */}
            <Box sx={{ width: '100%' }} className='flex flex-row items-center'>
              <input
                type='checkbox'
                style={{ width: 18, height: 18, marginRight: 8 }}
                checked={startDateEnabled}
                onChange={() => setStartDateEnabled(!startDateEnabled)}
              />
              <DateTimePicker
                disabled={!startDateEnabled}
                label='Start date'
                value={startDateValue}
                onChange={(newValue) => handleSelectStartDate(newValue!)}
                sx={{ width: '100%' }}
              />
            </Box>
            {/* Select due date */}
            <Box sx={{ width: '100%' }} className='flex flex-row items-center'>
              <input
                type='checkbox'
                style={{ width: 18, height: 18, marginRight: 8 }}
                checked={dueDateEnabled}
                onChange={() => setDueDateEnabled(!dueDateEnabled)}
              />
              <DateTimePicker
                disabled={!dueDateEnabled}
                label='Due date'
                value={dueDateValue}
                onChange={(newValue) => handleSelectDueDate(newValue!)}
                sx={{ width: '100%' }}
              />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
        {/* END: Select card dates */}
        <Box sx={{ width: '100%', height: 20 }}></Box>
        {/* Due date reminder */}
        <p style={{ margin: '12px 0 8px 0', color: colors.primary }} className='text-xs font-bold'>
          Set due date reminder
        </p>
        <FormControl fullWidth>
          <Select
            sx={{ height: 36, margin: '0 0 8px 0', fontSize: 14 }}
            value={reminderDateValue}
            onChange={handleSelectReminderDate}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 144,
                  marginTop: 8
                }
              }
            }}
          >
            {reminderDateChoices.map((choice, index) => (
              <MenuItem key={index} value={choice} sx={{ fontSize: menuItemFontSize }}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p style={{ margin: '0 0 20px 0', color: colors.primary }} className='text-xs font-semibold'>
          Reminders will be sent to all members and watchers of this card.
        </p>
        {/* Button save */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            margin: '0 0 8px 0',
            padding: '0 8px',
            bgcolor: '#0c66e4',
            '&:hover': {
              filter: 'brightness(90%)'
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={() => {
            updateCardDates()
            handleClose()
          }}
        >
          <h2 className='text-sm font-semibold text-white'>Save</h2>
        </Box>
        {/* Button remove */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            margin: '0 0 8px 0',
            padding: '0 8px',
            color: colors.primary,
            bgcolor: colorsButton.secondary,
            '&:hover': {
              bgcolor: colorsButton.secondary_hover
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={handleClose}
        >
          <h2 className='text-sm font-semibold'>Remove</h2>
        </Box>
      </Box>
    </Popover>
  )
}
