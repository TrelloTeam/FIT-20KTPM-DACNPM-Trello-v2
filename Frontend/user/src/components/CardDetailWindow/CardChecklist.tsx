import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, LinearProgress, LinearProgressProps, TextareaAutosize, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { ModelCheckitem, ModelChecklist } from '~/components/CardDetailWindow/index'

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
      Delete
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
  setChecklist: (newState: ModelChecklist) => void
  setProgress: (newState: number) => void
}

function ChecklistItem({ checkitem, checklist, setChecklist, setProgress }: ChecklistItemProps) {
  function handleCheckbox() {
    const updatedChecklist = {
      ...checklist,
      array: checklist.array.map((item) =>
        item._id === checkitem._id ? { ...item, isChecked: !item.isChecked } : item
      )
    }
    setChecklist(updatedChecklist)
  }

  // useEffect to ensure setProgress is called after setChecklist
  useEffect(() => {
    const count = checklist.array.reduce((count, item) => (item.isChecked ? count + 1 : count), 0)
    const progress = (count / checklist.array.length) * 100
    setProgress(progress)
  }, [checklist, setProgress])

  return (
    <Box sx={{ width: '100%' }} className='mb-4 flex flex-row items-center'>
      <Box sx={{ width: 40 }} className='flex items-center justify-center'>
        <input
          style={{ width: 16, height: 16 }}
          type='checkbox'
          checked={checkitem.isChecked}
          onChange={handleCheckbox}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <p className='text-sm'>{checkitem.title}</p>
      </Box>
    </Box>
  )
}

interface CardChecklistProps {
  checklist: ModelChecklist
  setChecklist: (newState: ModelChecklist) => void
}

export default function CardChecklist({ checklist, setChecklist }: CardChecklistProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div style={{ margin: '30px 0 0 0', color: colors.primary }} className='flex flex-col gap-1'>
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
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
        {checklist.array.map((checkitem) => (
          <ChecklistItem
            checkitem={checkitem}
            checklist={checklist}
            setChecklist={setChecklist}
            setProgress={setProgress}
          />
        ))}
      </Box>
      {/* END: Body */}
    </div>
  )
}
