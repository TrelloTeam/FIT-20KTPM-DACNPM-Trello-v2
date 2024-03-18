import { faEllipsis, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, LinearProgress, LinearProgressProps, TextareaAutosize, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { _Card, _Feature_Checklist, _Feature_Checklist_Item } from '.'
import { ChecklistItemModal, DeleteChecklistModal } from './modals/CardChecklistModal'
import { useTheme } from '../Theme/themeContext'

interface ChecklistAddTextAreaProps {
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
  currentChecklist: _Feature_Checklist
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

function ChecklistAddTextArea({
  isInputFocused,
  setIsInputFocused,
  currentChecklist,
  currentCard,
  setCurrentCard
}: ChecklistAddTextAreaProps) {
  const { colors } = useTheme()
  const [textAreaValue, setTextAreaValue] = useState('')

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isInputFocused && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isInputFocused])

  function handleSave() {
    // Remove unnecessary white space
    const trimmedValue = textAreaValue.replace(/\s+/g, ' ').trim()
    // Check if new checkitem title is empty
    if (trimmedValue.trim() !== '') {
      // Create id of new checkitem
      let newCheckitemIndex = '0'
      // If checklist is not empty
      if (currentChecklist.items.length !== 0) {
        newCheckitemIndex = (parseInt(currentChecklist.items[currentChecklist.items.length - 1]._id, 10) + 1).toString()
      }
      // Create new checkitem
      const newCheckitem: _Feature_Checklist_Item = {
        _id: newCheckitemIndex,
        name: trimmedValue,
        is_check: false
      }
      // Update checklist table
      const updatedCard = {
        ...currentCard,
        checklists: currentCard.checklists.map((checklist) =>
          checklist._id === currentChecklist._id
            ? {
                ...checklist,
                items: [...checklist.items, newCheckitem]
              }
            : checklist
        )
      }
      setCurrentCard(updatedCard)
    }
    // Close textarea
    handleClose()
  }

  function handleClose() {
    setIsInputFocused(false)
  }

  return (
    <div
      style={{
        width: '100%',
        height: 'fit-content',
        padding: '4px 0',
        whiteSpace: isInputFocused ? 'normal' : 'wrap',
        resize: 'none'
      }}
      className='flex flex-col'
    >
      <TextareaAutosize
        style={{
          width: '100%',
          padding: '4px 4px',
          whiteSpace: isInputFocused ? 'normal' : 'wrap',
          resize: 'none',
          background: colors.background
        }}
        minRows={2}
        placeholder='Add an item'
        value={textAreaValue}
        onChange={handleTextAreaChange}
        ref={textareaRef}
        onFocus={() => setIsInputFocused(true)}
        className='flex text-sm font-semibold'
      />
      {/* Title textarea control */}
      <Box className='mt-2 flex flex-row items-center gap-2'>
        <Box
          sx={{ width: 'fit-content', height: 32, bgcolor: '#0c66e4', color: '#fff', padding: '0 12px' }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={handleSave}
        >
          <p className='text-sm font-semibold'>Save</p>
        </Box>
        <Box
          sx={{
            width: 'fit-content',
            height: 32,
            color: colors.text,
            padding: '0 12px',
            '&:hover': {
              bgcolor: colors.button_hover
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={handleClose}
        >
          <p className='text-sm font-semibold'>Cancel</p>
        </Box>
      </Box>
    </div>
  )
}

interface ChecklistAddButtonProps {
  currentChecklist: _Feature_Checklist
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

function ChecklistAddButton({ currentChecklist, currentCard, setCurrentCard }: ChecklistAddButtonProps) {
  const { colors } = useTheme()
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <Box sx={{ width: '100%', height: 'fit-content', margin: '10px 0 0 40px' }} className='flex flex-wrap'>
      <div></div>
      {!isInputFocused && (
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
          onClick={() => setIsInputFocused(true)}
        >
          <p>Add an item</p>
        </Box>
      )}
      {isInputFocused && (
        <ChecklistAddTextArea
          isInputFocused={isInputFocused}
          setIsInputFocused={setIsInputFocused}
          currentChecklist={currentChecklist}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      )}
    </Box>
  )
}

interface ChecklistDeleteButtonProps {
  currentChecklistName: string
  handleDelete: () => void
}

function ChecklistDeleteButton({ currentChecklistName, handleDelete }: ChecklistDeleteButtonProps) {
  const { colors } = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenDeleteChecklistModal, setIsOpenDeleteChecklistModal] = useState(false)

  function openDeleteChecklistModal(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpenDeleteChecklistModal(true)
  }

  function handleDeleteAndClose() {
    handleDelete()
    handleClose()
  }

  function handleClose() {
    setIsOpenDeleteChecklistModal(false)
  }

  return (
    <Box
      sx={{
        bgcolor: colors.button,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        margin: '4px 0 0 10px',
        color: colors.text,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          bgcolor: colors.button_hover
        }
      }}
      className='flex cursor-pointer items-center justify-center rounded'
      onClick={openDeleteChecklistModal}
    >
      <p>Delete</p>
      {isOpenDeleteChecklistModal && (
        <DeleteChecklistModal
          checklistName={currentChecklistName}
          anchorEl={anchorEl}
          handleDelete={handleDeleteAndClose}
          handleClose={handleClose}
        />
      )}
    </Box>
  )
}

interface ChecklistNameFieldProps {
  checklistNameState: string
  setChecklistNameState: (newState: string) => void
  updateChecklistName: () => void
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
}

function ChecklistNameField({
  checklistNameState,
  setChecklistNameState,
  updateChecklistName,
  isInputFocused,
  setIsInputFocused
}: ChecklistNameFieldProps) {
  const { colors } = useTheme()
  const [initialValue, setInitialValue] = useState(checklistNameState)

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setChecklistNameState(event.target.value)
  }

  function handleSave() {
    const trimmedValue = checklistNameState.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialValue.trim()) {
      setInitialValue(checklistNameState)
      updateChecklistName()
    }
  }

  function handleOpen() {
    setIsInputFocused(true)
  }

  function handleClose() {
    if (checklistNameState.trim() !== initialValue.trim()) {
      setChecklistNameState(initialValue)
    }
    setIsInputFocused(false)
  }

  return (
    <div
      style={{
        width: '100%',
        padding: '4px 0',
        whiteSpace: isInputFocused ? 'normal' : 'wrap',
        resize: 'none'
      }}
      className='flex flex-col'
    >
      <TextareaAutosize
        style={{
          width: '100%',
          padding: '0 4px',
          whiteSpace: isInputFocused ? 'normal' : 'wrap',
          resize: 'none',
          background: isInputFocused ? colors.background_modal_tertiary : colors.background_modal
        }}
        minRows={1}
        value={checklistNameState}
        onChange={handleTextAreaChange}
        onBlur={handleClose}
        onFocus={handleOpen}
        className='flex cursor-pointer font-semibold'
      />
      {/* Title textarea control */}
      {isInputFocused && <TextAreaControl handleSave={handleSave} handleClose={handleClose} />}
    </div>
  )
}

interface TextAreaControlProps {
  handleSave: () => void
  handleClose: () => void
}

export function TextAreaControl({ handleSave, handleClose }: TextAreaControlProps) {
  const { colors } = useTheme()
  return (
    <Box className='mt-2 flex flex-row items-center gap-2'>
      <Box
        sx={{
          width: 'fit-content',
          height: 32,
          bgcolor: colors.button_primary,
          color: colors.button_primary_text,
          padding: '0 12px'
        }}
        className='flex cursor-pointer items-center justify-center rounded'
        onMouseDown={handleSave}
      >
        <p className='text-sm font-semibold'>Save</p>
      </Box>
      <Box
        sx={{ width: 'fit-content', height: 32, color: colors.text, padding: '0 6px' }}
        className='flex cursor-pointer items-center justify-center rounded'
        onMouseDown={handleClose}
      >
        <FontAwesomeIcon icon={faXmark} className='text-xl' />
      </Box>
    </Box>
  )
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  const { colors } = useTheme()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: '4px 0 10px 0' }}>
      <Box sx={{ width: 40, color: colors.text }} className='flex items-center justify-center text-xs'>
        <Typography variant='body2' color={colors.text}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', margin: '0 0 0 4px' }}>
        <LinearProgress
          sx={{ height: 8, bgcolor: colors.button }}
          className='rounded'
          variant='determinate'
          {...props}
        />
      </Box>
    </Box>
  )
}

interface ChecklistItemNameFieldProps {
  checklistItemNameState: string
  setChecklistItemNameState: (newState: string) => void
  updateChecklistItemName: () => void
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
}

function ChecklistItemNameField({
  checklistItemNameState,
  setChecklistItemNameState,
  updateChecklistItemName,
  isInputFocused,
  setIsInputFocused
}: ChecklistItemNameFieldProps) {
  const { colors } = useTheme()
  const [initialValue, setInitialValue] = useState(checklistItemNameState)

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setChecklistItemNameState(event.target.value)
  }

  function handleSave() {
    const trimmedValue = checklistItemNameState.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialValue.trim()) {
      setInitialValue(trimmedValue)
      updateChecklistItemName()
    }
  }

  function handleOpen() {
    setIsInputFocused(true)
  }

  function handleClose() {
    if (checklistItemNameState.trim() !== initialValue.trim()) {
      setChecklistItemNameState(initialValue)
    }
    setIsInputFocused(false)
  }

  return (
    <div
      style={{
        width: '100%',
        padding: '4px 0',
        margin: '0 10px 0 0',
        whiteSpace: isInputFocused ? 'normal' : 'wrap',
        resize: 'none'
      }}
      className='flex flex-col'
    >
      <TextareaAutosize
        autoFocus
        style={{
          width: '100%',
          padding: '8px 8px',
          whiteSpace: isInputFocused ? 'normal' : 'wrap',
          resize: 'none',
          background: colors.background
        }}
        minRows={3}
        value={checklistItemNameState}
        onChange={handleTextAreaChange}
        onBlur={handleClose}
        onFocus={handleOpen}
        className='flex text-sm'
      />
      {/* Title textarea control */}
      {isInputFocused && <TextAreaControl handleSave={handleSave} handleClose={handleClose} />}
    </div>
  )
}

interface ChecklistItemProps {
  currentCheckitem: _Feature_Checklist_Item
  currentChecklist: _Feature_Checklist
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  setProgress: (newState: number) => void
}

function ChecklistItem({
  currentCheckitem,
  currentChecklist,
  currentCard,
  setCurrentCard,
  setProgress
}: ChecklistItemProps) {
  const { colors } = useTheme()
  const [onFocus, setOnFocus] = useState(false)

  function handleCheckbox() {
    const updatedCard = {
      ...currentCard,
      checklists: currentCard.checklists.map((checklist) =>
        checklist._id === currentChecklist._id
          ? {
              ...checklist,
              items: currentChecklist.items.map((checkitem) =>
                checkitem._id === currentCheckitem._id ? { ...checkitem, is_check: !checkitem.is_check } : checkitem
              )
            }
          : checklist
      )
    }
    setCurrentCard(updatedCard)
  }

  const [openChecklistItemNameField, setOpenChecklistItemNameField] = useState(false)
  const [checklistItemNameState, setChecklistItemNameState] = useState(currentCheckitem.name)

  function updateChecklistItemName() {
    // Remove unnecessary white space
    const trimmedValue = checklistItemNameState.replace(/\s+/g, ' ').trim()
    // Check if new checkitem name is empty
    if (trimmedValue !== '') {
      const updatedCard = {
        ...currentCard,
        checklists: currentCard.checklists.map((checklist) =>
          checklist._id === currentChecklist._id
            ? {
                ...checklist,
                items: currentChecklist.items.map((checkitem) =>
                  checkitem._id === currentCheckitem._id ? { ...checkitem, name: checklistItemNameState } : checkitem
                )
              }
            : checklist
        )
      }
      setCurrentCard(updatedCard)
    }
  }

  // useEffect to ensure setProgress is called after setChecklist
  useEffect(() => {
    const count = currentChecklist.items.reduce(
      (count: number, checkitem) => (checkitem.is_check ? count + 1 : count),
      0
    )
    const progress = (count / currentChecklist.items.length) * 100
    setProgress(progress)
  }, [currentChecklist, setProgress])

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null)
  const [isOpenChecklistItemModal, setIsOpenChecklistItemModal] = useState(false)

  function openChecklistItemModal(event: React.MouseEvent<SVGSVGElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpenChecklistItemModal(true)
  }

  function closeChecklistItemModal() {
    setIsOpenChecklistItemModal(false)
    setOnFocus(false)
  }

  function deleteChecklistItem() {
    const updatedCard = {
      ...currentCard,
      checklists: currentCard.checklists.map((checklist) =>
        checklist._id === currentChecklist._id
          ? {
              ...checklist,
              items: checklist.items.filter((checkitem) => checkitem._id !== currentCheckitem._id)
            }
          : checklist
      )
    }
    setCurrentCard(updatedCard)
  }

  return (
    <Box sx={{ width: '100%', height: 'fit-content' }} className='flex flex-row'>
      <Box sx={{ width: 36, marginTop: '12px' }} className='flex justify-center'>
        <input
          style={{ width: 16, height: 16, background: colors.background }}
          type='checkbox'
          checked={currentCheckitem.is_check}
          onChange={handleCheckbox}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: '4px 0 4px 10px',
          bgcolor: openChecklistItemNameField ? colors.button : 'none',
          '&:hover': {
            bgcolor: colors.button
          }
        }}
        className='flex cursor-pointer items-center justify-between rounded-xl'
        onMouseEnter={() => setOnFocus(true)}
        onMouseLeave={() => setOnFocus(false)}
      >
        {!openChecklistItemNameField && (
          <p
            style={{ height: 32 }}
            className={`text-sm ${currentCheckitem.is_check ? 'line-through' : ''} flex items-center`}
            onClick={() => setOpenChecklistItemNameField(true)}
          >
            {currentCheckitem.name}
          </p>
        )}
        {openChecklistItemNameField && (
          <ChecklistItemNameField
            checklistItemNameState={checklistItemNameState}
            setChecklistItemNameState={setChecklistItemNameState}
            updateChecklistItemName={updateChecklistItemName}
            isInputFocused={openChecklistItemNameField}
            setIsInputFocused={setOpenChecklistItemNameField}
          />
        )}
        {onFocus && !openChecklistItemNameField && (
          <Box
            sx={{
              width: 24,
              height: 24,
              margin: '0 10px 0 0',
              padding: '0 0 0 2px',
              bgcolor: colors.button_hover,
              borderRadius: 200,
              '&:hover': {
                bgcolor: colors.button_hover_hover
              }
            }}
            className='flex items-center justify-center'
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              className='flex items-center justify-center text-sm'
              onClick={(event) => openChecklistItemModal(event)}
              onBlur={closeChecklistItemModal}
            />
            {isOpenChecklistItemModal && onFocus && anchorEl != null && (
              <ChecklistItemModal
                anchorEl={anchorEl}
                handleDelete={deleteChecklistItem}
                handleClose={closeChecklistItemModal}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

interface CardChecklistProps {
  currentChecklist: _Feature_Checklist
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export default function CardChecklist({ currentChecklist, currentCard, setCurrentCard }: CardChecklistProps) {
  const { colors } = useTheme()
  // START: Handle edit Checklist name
  const [checklistNameState, setChecklistNameState] = useState(currentChecklist.name)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [progress, setProgress] = useState(0)

  function updateChecklistName() {
    // Remove unnecessary white space
    const trimmedValue = checklistNameState.replace(/\s+/g, ' ').trim()
    // Check if new checklist name is empty
    if (trimmedValue !== '') {
      // Update checklist name
      const updatedCard = {
        ...currentCard,
        checklists: currentCard.checklists.map((checklist) =>
          checklist._id === currentChecklist._id
            ? {
                ...checklist,
                name: trimmedValue
              }
            : checklist
        )
      }
      setChecklistNameState(trimmedValue)
      setCurrentCard(updatedCard)
    }
    closeChecklistField()
  }

  function closeChecklistField() {
    setIsInputFocused(false)
  }
  // END: Handle edit Checklist name

  function deleteChecklist() {
    const updatedCard = {
      ...currentCard,
      checklists: currentCard.checklists.filter((checklist) => checklist._id !== currentChecklist._id)
    }
    setCurrentCard(updatedCard)
  }

  return (
    <div style={{ margin: '30px 0 0 0', color: colors.text }} className='flex flex-col flex-wrap gap-1'>
      {/* START: Header */}
      <div style={{ height: 'fit-content' }} className='flex flex-row justify-between'>
        {/* Title */}
        <div style={{ padding: '4px 0 0 0' }} className='relative flex flex-grow flex-row'>
          {/* Title icon */}
          <FontAwesomeIcon icon={faSquareCheck} style={{ width: 40, margin: '4px 0 0 0' }} className='text-xl' />
          {/* Title textarea */}
          <ChecklistNameField
            checklistNameState={checklistNameState}
            setChecklistNameState={setChecklistNameState}
            updateChecklistName={updateChecklistName}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
          />
        </div>
        {/* Delete button */}
        {!isInputFocused && (
          <ChecklistDeleteButton currentChecklistName={currentChecklist.name} handleDelete={deleteChecklist} />
        )}
      </div>
      {/* END: Header */}
      {/* START: Body */}
      <Box sx={{ width: '100%' }} className='flex flex-col'>
        <LinearProgressWithLabel value={progress} />
        {currentChecklist.items.map((checkitem) => (
          <ChecklistItem
            key={checkitem._id}
            currentCheckitem={checkitem}
            currentChecklist={currentChecklist}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            setProgress={setProgress}
          />
        ))}
        <ChecklistAddButton
          currentChecklist={currentChecklist}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      </Box>
      {/* END: Body */}
    </div>
  )
}
