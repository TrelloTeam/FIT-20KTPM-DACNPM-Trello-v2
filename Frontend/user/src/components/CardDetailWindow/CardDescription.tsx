import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, TextareaAutosize } from '@mui/material'
import { useState } from 'react'
import { colors, colorsButton } from '~/styles'

function EditButton() {
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
      Edit
    </Box>
  )
}

export default function CardDescription() {
  const [textAreaMinRows, setTextAreaMinRows] = useState<number>(6)

  function handleTextAreaBlur() {
    setTextAreaMinRows(1)
  }

  function handleTextAreaFocus() {
    setTextAreaMinRows(6)
  }

  return (
    <div style={{ margin: '30px 0 0 40px', color: colors.primary }} className='flex flex-col gap-1'>
      {/* START: Header */}
      <div className='flex flex-row items-center justify-between'>
        {/* Title */}
        <div className='relative flex flex-row items-center'>
          <FontAwesomeIcon icon={faAlignJustify} style={{ width: 30, left: -40 }} className='absolute text-2xl' />
          <h2 className='font-semibold'>Description</h2>
        </div>
        {/* Edit button */}
        <EditButton />
      </div>
      {/* END: Header */}
      <TextareaAutosize
        style={{ width: '100%', resize: 'none' }}
        className='mt-1 px-3 py-2 text-sm'
        minRows={textAreaMinRows}
        onBlur={handleTextAreaBlur}
        onFocus={handleTextAreaFocus}
        value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id diam maecenas ultricies mi eget. Morbi tincidunt augue interdum velit euismod. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Sed vulputate mi sit amet mauris commodo quis. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Eu volutpat odio facilisis mauris.'
      />
    </div>
  )
}
