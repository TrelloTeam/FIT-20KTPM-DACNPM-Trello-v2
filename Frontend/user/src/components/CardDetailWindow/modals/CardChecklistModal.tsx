import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, Popover } from '@mui/material'
import { colors, colorsButton } from '~/styles'
import { _Card, _Feature_Activity, _Feature_Checklist } from '..'
import { useState } from 'react'
import moment from 'moment'

interface CreateCardChecklistModalProps {
  anchorEl: (EventTarget & HTMLDivElement) | null
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  handleClose: () => void
}

export function CreateCardChecklistModal({
  anchorEl,
  currentCard,
  setCurrentCard,
  handleClose
}: CreateCardChecklistModalProps) {
  const [textFieldValue, setTextFieldValue] = useState('')

  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTextFieldValue(event.target.value)
  }

  function createChecklist() {
    const trimmedValue = textFieldValue.replace(/\s+/g, ' ').trim()
    const newChecklist: _Feature_Checklist = {
      _id: currentCard.checklists.length.toString(),
      name: trimmedValue,
      type: 'checklist',
      items: []
    }
    const newActivity: _Feature_Activity = {
      workspace_id: '0',
      board_id: '0',
      cardlist_id: '0',
      card_id: '0',
      content: `TrelloUser added ${trimmedValue} to this card`,
      time: moment().format()
    }
    const updatedCard = {
      ...currentCard,
      checklists: [...currentCard.checklists, newChecklist],
      activities: [...currentCard.activities, newActivity]
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
    >
      <Box
        sx={{ width: 300, height: 'fit-content', margin: '0 8px', padding: '8px 0px', color: colors.primary }}
        className='flex flex-col'
      >
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '0 0 12px 0' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Add checklist</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Input checklist title */}
        <p style={{ margin: '10px 0 4px 0', color: colors.primary }} className='text-xs font-bold'>
          Title
        </p>
        <input
          autoFocus
          style={{
            width: '100%',
            height: 36,
            margin: '0 0 20px 0',
            padding: '4px 6px',
            color: colors.primary,
            border: `2px solid ${colorsButton.secondary_hover}`
          }}
          className='flex items-center rounded-sm text-sm'
          value={textFieldValue}
          onChange={(e) => handleTextFieldChange(e)}
          placeholder='Checklist title'
        />
        {/* Button */}
        <Box
          sx={{
            bgcolor: '#0c66e4',
            width: 'fit-content',
            height: 32,
            margin: '0 0 10px 0',
            padding: '0 20px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(90%)'
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={() => {
            if (textFieldValue.trim() !== '') {
              createChecklist()
              handleClose()
            }
          }}
        >
          <p>Add</p>
        </Box>
      </Box>
    </Popover>
  )
}

interface DeleteChecklistModalProps {
  checklistName: string
  anchorEl: (EventTarget & HTMLDivElement) | null
  handleDelete: () => void
  handleClose: () => void
}

export function DeleteChecklistModal({
  checklistName,
  anchorEl,
  handleDelete,
  handleClose
}: DeleteChecklistModalProps) {
  function handleDeleteAndClose() {
    handleDelete()
    handleClose()
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
      sx={{ margin: '6px 0 0 0' }}
    >
      <Box
        sx={{ width: 300, height: 'fit-content', margin: '0 8px', padding: '8px 0px', color: colors.primary }}
        className='flex flex-col'
      >
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '0 0 12px 0' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>
              Delete {checklistName}
            </h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Warning */}
        <p className='mb-4 mt-1 text-sm'>Deleting a checklist is permanent and there is no way to get it back.</p>
        {/* Button */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            padding: '0 8px',
            bgcolor: '#f00',
            '&:hover': {
              filter: 'brightness(90%)'
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={handleDeleteAndClose}
        >
          <h2 className='text-sm font-semibold text-white'>Delete checklist</h2>
        </Box>
      </Box>
    </Popover>
  )
}

interface ChecklistItemModalProps {
  anchorEl: (EventTarget & SVGSVGElement) | null
  handleDelete: () => void
  handleClose: () => void
}

export function ChecklistItemModal({ anchorEl, handleDelete, handleClose }: ChecklistItemModalProps) {
  function handleDeleteAndClose() {
    handleDelete()
    handleClose()
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
    >
      <Box
        sx={{ width: 300, height: 'fit-content', padding: '8px 0px', color: colors.primary }}
        className='flex flex-col'
      >
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '0 0 12px 0' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex justify-center'>
            <h2 className='text-sm font-semibold'>Item actions</h2>
          </Grid>
          <Grid item xs={1}>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            padding: '0 8px',
            '&:hover': {
              bgcolor: colorsButton.secondary
            }
          }}
          className='flex cursor-pointer items-center'
          onClick={handleDeleteAndClose}
        >
          <h2 className='text-sm'>Delete</h2>
        </Box>
      </Box>
    </Popover>
  )
}
