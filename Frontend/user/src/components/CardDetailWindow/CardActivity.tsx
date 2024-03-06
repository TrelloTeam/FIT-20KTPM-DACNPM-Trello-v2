import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, TextareaAutosize } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { colors, colorsButton } from '~/styles'

function ShowDetailsButton() {
  return (
    <Box
      sx={{
        bgcolor: colorsButton.secondary,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        color: colors.primary,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          bgcolor: colorsButton.secondary_hover
        }
      }}
      className='flex cursor-pointer items-center justify-center rounded'
    >
      <p>Show details</p>
    </Box>
  )
}

interface TextAreaControlProps {
  textAreaValue: string
  setTextAreaFocus: (newState: boolean) => void
  buttonEnabled: boolean
  setButtonEnabled: (newState: boolean) => void
}

function TextAreaControl({ textAreaValue, setTextAreaFocus, buttonEnabled, setButtonEnabled }: TextAreaControlProps) {
  function handleSave() {
    setButtonEnabled(false)
    setTextAreaFocus(false)
  }

  return (
    <Box sx={{ height: 32 }} className='mt-2 flex flex-row items-center gap-2'>
      <button
        style={{
          width: 'fit-content',
          height: 32,
          backgroundColor: buttonEnabled ? '#0c66e4' : colorsButton.secondary,
          color: buttonEnabled ? '#fff' : colors.primary,
          padding: '0 12px'
        }}
        className='mt-2 flex items-center justify-center rounded pb-2'
        onClick={handleSave}
        disabled={!buttonEnabled}
      >
        <p className='text-sm font-semibold'>Save</p>
      </button>
      <Box
        sx={{ width: 'fit-content', height: 32, color: colors.primary, padding: '0 6px' }}
        className='flex cursor-pointer items-center justify-center rounded'
      >
        <input style={{ width: 16, height: 16 }} type='checkbox' />
        <p className='ml-2 text-sm'>Watch</p>
      </Box>
    </Box>
  )
}

export default function CardActivity() {
  const [textAreaMinRows, setTextAreaMinRows] = useState<number>(1)
  const [textAreaValue, setTextAreaValue] = useState('')
  const [textAreaFocus, setTextAreaFocus] = useState(false)
  const [buttonEnabled, setButtonEnabled] = useState(false)

  function handleTextAreaBlur() {
    setTextAreaMinRows(1)
    setTextAreaValue('')
    setTextAreaFocus(false)
    setButtonEnabled(false)
  }

  function handleTextAreaFocus() {
    setTextAreaMinRows(2)
    setTextAreaFocus(true)
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
    if (event.target.value.trim() === '') {
      setButtonEnabled(false)
    } else {
      setButtonEnabled(true)
    }
  }

  return (
    <div style={{ margin: '40px 0 0 0px', color: colors.primary }} className='flex flex-col gap-1'>
      {/* START: Header */}
      <div style={{ margin: '0px 0 10px 40px' }} className='flex flex-row items-center justify-between'>
        {/* Title */}
        <div className='relative flex flex-row items-center'>
          <FontAwesomeIcon icon={faListUl} style={{ width: 30, left: -40 }} className='absolute text-xl' />
          <h2 className='font-semibold'>Activities</h2>
        </div>
        {/* Show details button */}
        <ShowDetailsButton />
      </div>
      {/* END: Header */}
      {/* START: Body */}
      <div style={{ width: '100%' }} className='flex items-start'>
        <Box sx={{ width: 44, marginTop: '2px' }}>
          <Avatar
            sx={{
              bgcolor: '#8a2be2',
              width: 32,
              height: 32,
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              '&:hover': {
                filter: 'brightness(85%)'
              }
            }}
            className='cursor-pointer'
          >
            <p>AV</p>
          </Avatar>
        </Box>
        <Box style={{ width: '100%', resize: 'none' }} className='flex flex-col'>
          <TextareaAutosize
            style={{ width: '100%', resize: 'none', border: '2px solid', borderColor: colorsButton.secondary }}
            className='rounded-lg px-3 py-2 text-sm'
            minRows={textAreaMinRows}
            value={textAreaValue}
            onChange={handleTextAreaChange}
            onBlur={handleTextAreaBlur}
            onFocus={handleTextAreaFocus}
            placeholder='Write a comment...'
          />
          {textAreaFocus && (
            <TextAreaControl
              textAreaValue={textAreaValue}
              setTextAreaFocus={setTextAreaFocus}
              buttonEnabled={buttonEnabled}
              setButtonEnabled={setButtonEnabled}
            />
          )}
        </Box>
      </div>
      {/* END: Body */}
    </div>
  )
}
