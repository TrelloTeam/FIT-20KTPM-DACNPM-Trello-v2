import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, TextareaAutosize } from '@mui/material'
import { useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { TextAreaControl } from './CardChecklist'
import { _Card } from '.'

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
      <p>Edit</p>
    </Box>
  )
}

interface CardDescriptionProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export default function CardDescription({ currentCard, setCurrentCard }: CardDescriptionProps) {
  const [textAreaMinRows, setTextAreaMinRows] = useState<number>(6)
  const [isOpenTextArea, setIsOpenTextArea] = useState(false)
  const [initialValue, setInitialValue] = useState(currentCard.description)
  const [textAreaValue, setTextAreaValue] = useState(currentCard.description)

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(event.target.value)
  }

  function handleSave() {
    const trimmedValue = textAreaValue.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialValue.trim()) {
      const newCard: _Card = {
        ...currentCard,
        description: textAreaValue
      }
      setCurrentCard(newCard)
      setInitialValue(trimmedValue)
    }
    handleClose()
  }

  function handleClose() {
    if (textAreaValue.trim() !== initialValue.trim()) {
      setTextAreaValue(initialValue)
    }
    setTextAreaMinRows(1)
    setIsOpenTextArea(false)
  }

  function handleOpen() {
    setTextAreaMinRows(6)
    setIsOpenTextArea(true)
  }

  return (
    <div style={{ margin: '30px 0 0 40px', color: colors.primary }} className='flex flex-col gap-1'>
      {/* START: Header */}
      <div className='flex flex-row items-center justify-between'>
        {/* Title */}
        <div className='relative flex flex-row items-center'>
          <FontAwesomeIcon icon={faAlignJustify} style={{ width: 30, left: -40 }} className='absolute text-xl' />
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
        value={textAreaValue}
        onChange={handleTextAreaChange}
        onBlur={handleClose}
        onFocus={handleOpen}
      />
      {isOpenTextArea && <TextAreaControl handleSave={handleSave} handleClose={handleClose} />}
    </div>
  )
}
