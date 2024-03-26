import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, TextareaAutosize } from '@mui/material'
import { useRef, useState } from 'react'
import { TextAreaControl } from './CardChecklist'
import { useTheme } from '../Theme/themeContext'
import { Card } from '@trello-v2/shared/src/schemas/CardList'

interface EditButtonProps {
  onClick: () => void
}

function EditButton({ onClick }: EditButtonProps) {
  const { colors } = useTheme()
  return (
    <Box
      sx={{
        bgcolor: colors.button,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        color: colors.text,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          bgcolor: colors.button_hover
        }
      }}
      className='flex cursor-pointer items-center justify-center rounded'
      onClick={onClick}
    >
      <p>Edit</p>
    </Box>
  )
}

interface CardDescriptionProps {
  currentCard: Card
  setCurrentCard: (newState: Card) => void
}

export default function CardDescription({ currentCard, setCurrentCard }: CardDescriptionProps) {
  const { colors } = useTheme()
  const [textAreaMinRows, setTextAreaMinRows] = useState<number>(2)
  const [isOpenTextArea, setIsOpenTextArea] = useState<boolean>(false)
  const [initialValue, setInitialValue] = useState<string>(currentCard.description || '')
  const [textAreaValue, setTextAreaValue] = useState<string>(currentCard.description || '')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(event.target.value)
  }

  function handleSave() {
    const trimmedValue = textAreaValue.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialValue.trim()) {
      const newCard: Card = {
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
    setTextAreaMinRows(2)
    setIsOpenTextArea(false)
  }

  function handleOpen() {
    setTextAreaMinRows(6)
    setIsOpenTextArea(true)
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }

  return (
    <div style={{ margin: '24px 0 24px 40px', color: colors.text }} className='flex flex-col gap-1'>
      {/* START: Header */}
      <div className='flex flex-row items-center justify-between'>
        {/* Title */}
        <div className='relative flex flex-row items-center'>
          <FontAwesomeIcon icon={faAlignJustify} style={{ width: 30, left: -40 }} className='absolute text-xl' />
          <h2 className='font-semibold'>Description</h2>
        </div>
        {/* Edit button */}
        <EditButton onClick={handleOpen} />
      </div>
      {/* END: Header */}
      <TextareaAutosize
        ref={textAreaRef}
        style={{
          width: '100%',
          resize: 'none',
          background: isOpenTextArea
            ? colors.background_modal_tertiary
            : currentCard.description?.trim() !== ''
              ? colors.background_modal
              : colors.button
        }}
        className='mt-1 rounded-sm px-3 py-2 text-sm'
        placeholder={isOpenTextArea ? 'Make your description even better.' : 'Add a more detailed description...'}
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
