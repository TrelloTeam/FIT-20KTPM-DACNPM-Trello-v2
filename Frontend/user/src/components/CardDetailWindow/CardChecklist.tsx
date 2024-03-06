import { faEllipsis, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, LinearProgress, LinearProgressProps, TextareaAutosize, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { _Feature_Checklist, _Feature_Checklist_Item } from '.'

interface ChecklistAddTextAreaProps {
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
  currentChecklist: _Feature_Checklist
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
}

function ChecklistAddTextArea({
  isInputFocused,
  setIsInputFocused,
  currentChecklist,
  allChecklists,
  setAllChecklists
}: ChecklistAddTextAreaProps) {
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
      const newCheckitemIndex = (
        parseInt(currentChecklist.items[currentChecklist.items.length - 1]._id, 10) + 1
      ).toString()
      // Create new checkitem
      const newCheckitem: _Feature_Checklist_Item = {
        _id: newCheckitemIndex,
        name: trimmedValue,
        is_check: false
      }
      // Update checklist table
      const updatedAllChecklists = allChecklists.map((checklist) =>
        checklist._id === currentChecklist._id
          ? {
              ...checklist,
              items: [...checklist.items, newCheckitem]
            }
          : checklist
      )
      setAllChecklists(updatedAllChecklists)
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
          resize: 'none'
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
            color: colors.primary,
            padding: '0 12px',
            '&:hover': {
              bgcolor: colorsButton.secondary_hover
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
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
}

function ChecklistAddButton({ currentChecklist, allChecklists, setAllChecklists }: ChecklistAddButtonProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <Box sx={{ width: '100%', height: 'fit-content', margin: '10px 0 0 40px' }} className='flex flex-wrap'>
      <div></div>
      {!isInputFocused && (
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
          allChecklists={allChecklists}
          setAllChecklists={setAllChecklists}
        />
      )}
    </Box>
  )
}

function ChecklistDeleteButton() {
  return (
    <Box
      sx={{
        bgcolor: colorsButton.secondary,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        margin: '4px 0 0 10px',
        color: colors.primary,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          bgcolor: colorsButton.secondary_hover
        }
      }}
      className='flex cursor-pointer items-center justify-center rounded'
    >
      <p>Delete</p>
    </Box>
  )
}

interface ChecklistTitleProps {
  currentChecklist: _Feature_Checklist
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
}

function ChecklistTitle({
  currentChecklist,
  allChecklists,
  setAllChecklists,
  isInputFocused,
  setIsInputFocused
}: ChecklistTitleProps) {
  const [textAreaValue, setTextAreaValue] = useState(currentChecklist.name)

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  function handleOpen() {
    setIsInputFocused(true)
  }

  function handleClose() {
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
          resize: 'none'
        }}
        minRows={1}
        value={textAreaValue}
        onChange={handleTextAreaChange}
        onFocus={handleOpen}
        className='flex font-semibold'
      />
      {/* Title textarea control */}
      {isInputFocused && (
        <TextAreaControl
          currentChecklist={currentChecklist}
          allChecklists={allChecklists}
          setAllChecklists={setAllChecklists}
          handleClose={handleClose}
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
        />
      )}
    </div>
  )
}

interface TextAreaControlProps {
  currentChecklist: _Feature_Checklist
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
  handleClose: () => void
  textAreaValue: string
  setTextAreaValue: (newState: string) => void
}

function TextAreaControl({
  currentChecklist,
  allChecklists,
  setAllChecklists,
  handleClose,
  textAreaValue,
  setTextAreaValue
}: TextAreaControlProps) {
  function handleSave() {
    // Remove unnecessary white space
    const trimmedValue = textAreaValue.replace(/\s+/g, ' ').trim()
    // Check if new checkitem title is empty
    if (trimmedValue.trim() !== '') {
      // Update checklist name
      const updatedAllChecklists = allChecklists.map((checklist) =>
        checklist._id === currentChecklist._id
          ? {
              ...checklist,
              name: trimmedValue
            }
          : checklist
      )
      setTextAreaValue(trimmedValue)
      setAllChecklists(updatedAllChecklists)
    }
    // Close textarea
    handleClose()
  }

  return (
    <Box className='mt-2 flex flex-row items-center gap-2'>
      <Box
        sx={{ width: 'fit-content', height: 32, bgcolor: '#0c66e4', color: '#fff', padding: '0 12px' }}
        className='flex cursor-pointer items-center justify-center rounded'
        onClick={handleSave}
      >
        <p className='text-sm font-semibold'>Save</p>
      </Box>
      <Box
        sx={{ width: 'fit-content', height: 32, color: colors.primary, padding: '0 6px' }}
        className='flex cursor-pointer items-center justify-center rounded'
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faXmark} className='text-xl' />
      </Box>
    </Box>
  )
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: '4px 0 10px 0' }}>
      <Box sx={{ width: 40, color: colors.primary }} className='flex items-center justify-center text-xs'>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', margin: '0 0 0 4px' }}>
        <LinearProgress
          sx={{ height: 8, bgcolor: colorsButton.secondary }}
          className='rounded'
          variant='determinate'
          {...props}
        />
      </Box>
    </Box>
  )
}

interface ChecklistItemProps {
  currentCheckitem: _Feature_Checklist_Item
  currentChecklist: _Feature_Checklist
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
  setProgress: (newState: number) => void
}

function ChecklistItem({
  currentCheckitem,
  currentChecklist,
  allChecklists,
  setAllChecklists,
  setProgress
}: ChecklistItemProps) {
  const [onFocus, setOnFocus] = useState(false)

  function handleCheckbox() {
    const updatedAllChecklists = allChecklists.map((checklist) =>
      checklist._id === currentChecklist._id
        ? {
            ...checklist,
            items: currentChecklist.items.map((checkitem) =>
              checkitem._id === currentCheckitem._id ? { ...checkitem, is_check: !checkitem.is_check } : checkitem
            )
          }
        : checklist
    )
    setAllChecklists(updatedAllChecklists)
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

  return (
    <Box sx={{ width: '100%', height: 36 }} className='flex flex-row items-center'>
      <Box sx={{ width: 36 }} className='flex items-center justify-center'>
        <input
          style={{ width: 16, height: 16 }}
          type='checkbox'
          checked={currentCheckitem.is_check}
          onChange={handleCheckbox}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: '0 0 0 10px',
          '&:hover': {
            bgcolor: colorsButton.secondary
          }
        }}
        className='flex cursor-pointer items-center justify-between rounded-xl'
        onMouseEnter={() => setOnFocus(true)}
        onMouseLeave={() => setOnFocus(false)}
      >
        <p className={`text-sm ${currentCheckitem.is_check ? 'line-through' : ''}`}>{currentCheckitem.name}</p>
        {onFocus && (
          <Box
            sx={{
              width: 24,
              height: 24,
              margin: '0 10px 0 0',
              padding: '0 0 0 2px',
              bgcolor: colorsButton.secondary_hover,
              borderRadius: 200,
              '&:hover': {
                bgcolor: colorsButton.secondary_hover_hover
              }
            }}
            className='flex items-center justify-center'
          >
            <FontAwesomeIcon icon={faEllipsis} className='flex items-center justify-center text-sm' />
          </Box>
        )}
      </Box>
    </Box>
  )
}

interface CardChecklistProps {
  currentChecklist: _Feature_Checklist
  allChecklists: _Feature_Checklist[]
  setAllChecklists: (newState: _Feature_Checklist[]) => void
}

export default function CardChecklist({ currentChecklist, allChecklists, setAllChecklists }: CardChecklistProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div style={{ margin: '30px 0 0 0', color: colors.primary }} className='flex flex-col flex-wrap gap-1'>
      {/* START: Header */}
      <div style={{ height: 'fit-content' }} className='flex flex-row justify-between'>
        {/* Title */}
        <div style={{ padding: '4px 0 0 0' }} className='relative flex flex-grow flex-row'>
          {/* Title icon */}
          <FontAwesomeIcon icon={faSquareCheck} style={{ width: 40, margin: '4px 0 0 0' }} className='text-xl' />
          {/* Title textarea */}
          <ChecklistTitle
            currentChecklist={currentChecklist}
            allChecklists={allChecklists}
            setAllChecklists={setAllChecklists}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
          />
        </div>
        {/* Edit button */}
        {!isInputFocused && <ChecklistDeleteButton />}
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
            allChecklists={allChecklists}
            setAllChecklists={setAllChecklists}
            setProgress={setProgress}
          />
        ))}
        <ChecklistAddButton
          currentChecklist={currentChecklist}
          allChecklists={allChecklists}
          setAllChecklists={setAllChecklists}
        />
      </Box>
      {/* END: Body */}
    </div>
  )
}
