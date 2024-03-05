import { faEllipsis, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, LinearProgress, LinearProgressProps, TextareaAutosize, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { ModelCheckitem, ModelChecklist } from '~/components/CardDetailWindow/index'

interface ChecklistAddTextAreaProps {
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
  checklistIndex: number
  checklistTable: ModelChecklist[]
  setChecklistTable: (newState: ModelChecklist[]) => void
}

function ChecklistAddTextArea({
  isInputFocused,
  setIsInputFocused,
  checklistIndex,
  checklistTable,
  setChecklistTable
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
    // Check if new checkitem title is empty
    if (textAreaValue.trim() !== '') {
      // Get index of next checkitem
      const nextIndex =
        checklistTable
          .filter((checklist) => checklist._id === checklistIndex)
          .map((filteredChecklist) => filteredChecklist.array.length)[0] || 0
      // Create new checkitem
      const newCheckitem: ModelCheckitem = {
        _id: nextIndex,
        title: textAreaValue,
        isChecked: false
      }
      // Update checklist table
      const updatedChecklistTable = checklistTable.map((checklist) =>
        checklist._id === checklistIndex
          ? {
              ...checklist,
              array: [...checklist.array, newCheckitem]
            }
          : checklist
      )
      setChecklistTable(updatedChecklistTable)
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
          onClick={handleSave}
        >
          <p className='text-sm font-semibold' onClick={handleClose}>
            Cancel
          </p>
        </Box>
      </Box>
    </div>
  )
}

interface ChecklistAddButtonProps {
  checklistIndex: number
  checklistTable: ModelChecklist[]
  setChecklistTable: (newState: ModelChecklist[]) => void
}

function ChecklistAddButton({ checklistIndex, checklistTable, setChecklistTable }: ChecklistAddButtonProps) {
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
          checklistIndex={checklistIndex}
          checklistTable={checklistTable}
          setChecklistTable={setChecklistTable}
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
  title: string
  isInputFocused: boolean
  setIsInputFocused: (newState: boolean) => void
}

function ChecklistTitle({ title, isInputFocused, setIsInputFocused }: ChecklistTitleProps) {
  function handleFocus() {
    setIsInputFocused(true)
  }

  function handleBlur() {
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
        value={title}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='flex font-semibold'
      />
      {/* Title textarea control */}
      {isInputFocused && <TextAreaControl />}
    </div>
  )
}

function TextAreaControl() {
  return (
    <Box className='mt-2 flex flex-row items-center gap-2'>
      <Box
        sx={{ width: 'fit-content', height: 32, bgcolor: '#0c66e4', color: '#fff', padding: '0 12px' }}
        className='flex cursor-pointer items-center justify-center rounded'
      >
        <p className='text-sm font-semibold'>Save</p>
      </Box>
      <Box
        sx={{ width: 'fit-content', height: 32, color: colors.primary, padding: '0 6px' }}
        className='flex cursor-pointer items-center justify-center rounded'
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
  checkitem: ModelCheckitem
  checklist: ModelChecklist
  checklistTable: ModelChecklist[]
  setChecklistTable: (newState: ModelChecklist[]) => void
  setProgress: (newState: number) => void
}

function ChecklistItem({ checkitem, checklist, checklistTable, setChecklistTable, setProgress }: ChecklistItemProps) {
  const [onFocus, setOnFocus] = useState(false)

  function handleCheckbox() {
    const updatedChecklistTable = checklistTable.map((item) =>
      item._id === checklist._id
        ? {
            ...item,
            array: checklist.array.map((item2) =>
              item2._id === checkitem._id ? { ...item2, isChecked: !item2.isChecked } : item2
            )
          }
        : item
    )
    setChecklistTable(updatedChecklistTable)
  }

  // useEffect to ensure setProgress is called after setChecklist
  useEffect(() => {
    const count = checklist.array.reduce((count, item) => (item.isChecked ? count + 1 : count), 0)
    const progress = (count / checklist.array.length) * 100
    setProgress(progress)
  }, [checklist, setProgress])

  return (
    <Box sx={{ width: '100%', height: 36 }} className='flex flex-row items-center'>
      <Box sx={{ width: 36 }} className='flex items-center justify-center'>
        <input
          style={{ width: 16, height: 16 }}
          type='checkbox'
          checked={checkitem.isChecked}
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
        <p className={`text-sm ${checkitem.isChecked ? 'line-through' : ''}`}>{checkitem.title}</p>
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
  checklist: ModelChecklist
  checklistTable: ModelChecklist[]
  setChecklistTable: (newState: ModelChecklist[]) => void
}

export default function CardChecklist({ checklist, checklistTable, setChecklistTable }: CardChecklistProps) {
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
            title={checklist.title}
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
        {checklist.array.map((checkitem) => (
          <ChecklistItem
            key={checkitem._id}
            checkitem={checkitem}
            checklist={checklist}
            checklistTable={checklistTable}
            setChecklistTable={setChecklistTable}
            setProgress={setProgress}
          />
        ))}
        <ChecklistAddButton
          checklistIndex={checklist._id}
          checklistTable={checklistTable}
          setChecklistTable={setChecklistTable}
        />
      </Box>
      {/* END: Body */}
    </div>
  )
}
