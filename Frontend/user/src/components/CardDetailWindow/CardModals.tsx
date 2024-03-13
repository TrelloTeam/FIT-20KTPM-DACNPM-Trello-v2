import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Box, Grid, Popover } from '@mui/material'
import { colors, colorsButton } from '~/styles'
import { _Card, _Feature_CardLabel } from '.'
import { MemberAvatar } from './CardMemberList'
import { ChangeEvent, useState } from 'react'
import { labelColors } from './CardLabelList'

interface MemberAvatarAndNameProps {
  email: string
  bgColor: string
}

function MemberAvatarAndName({ email, bgColor }: MemberAvatarAndNameProps) {
  return (
    <Grid
      container
      sx={{ width: '100%', height: 40, padding: '4px', '&:hover': { bgcolor: colorsButton.secondary } }}
      className='flex cursor-pointer items-center'
    >
      <Grid item xs={2} sx={{ height: '100%' }}>
        <MemberAvatar memberName={email ? email.slice(0, 2).toUpperCase() : ''} bgColor={bgColor} />
      </Grid>
      <Grid item xs={10} sx={{ height: '100%' }} className='flex items-center'>
        <p className='text-sm'>{email}</p>
      </Grid>
    </Grid>
  )
}

interface CardMemberModalProps {
  currentCard: _Card
  anchorEl: (EventTarget & HTMLDivElement) | null
  handleClose: () => void
}

export function CardMemberModal({ currentCard, anchorEl, handleClose }: CardMemberModalProps) {
  const bgColors: string[] = ['#8a2be2', '#1e90ff', '#66cdaa', '#ffa500', '#FFD700', '#DC143C']
  const boardMemberEmails: string[] = ['restjs@gmail.com', 'mongodb@gmail.com']

  const [searchValue, setSearchValue] = useState('')
  // Card member emails
  const [cardMemberListState, setCardMemberListState] = useState(currentCard.watcher_email)
  // Board member emails
  const [boardMemberListState, setBoardMemberListState] = useState(boardMemberEmails)

  function filterMemberLists(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value)
    // Filter card member list
    setCardMemberListState(
      currentCard.watcher_email.filter((email) => email.toLowerCase().includes(event.currentTarget.value.toLowerCase()))
    )
    // Filter board member list
    setBoardMemberListState(
      boardMemberEmails.filter((email) => email.toLowerCase().includes(event.currentTarget.value.toLowerCase()))
    )
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
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Members</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Search bar */}
        <input
          autoFocus
          style={{ width: '100%', height: 32, margin: '0 0 20px 0', padding: '4px 6px', color: colors.primary }}
          className='flex items-center text-sm'
          value={searchValue}
          onChange={(e) => filterMemberLists(e)}
          placeholder='Search members'
        />
        {/* Card member list */}
        <p style={{ margin: '10px 0', color: colors.primary }} className='text-xs font-semibold'>
          Card members
        </p>
        <Box className='flex flex-col'>
          {cardMemberListState.length != 0 &&
            cardMemberListState.map((email, index) => (
              <MemberAvatarAndName key={index} email={email} bgColor={bgColors[index]} />
            ))}
        </Box>
        {/* Board member list */}
        <p style={{ margin: '20px 0 10px 0', color: colors.primary }} className='text-xs font-semibold'>
          Board members
        </p>
        <Box className='flex flex-col'>
          {boardMemberListState.length != 0 &&
            boardMemberListState.map((email, index) => (
              <MemberAvatarAndName key={index} email={email} bgColor={bgColors[index + 4]} />
            ))}
        </Box>
      </Box>
    </Popover>
  )
}

interface CardLabelListTileProps {
  currentLabel: _Feature_CardLabel
  setSelectedLabel: (newState: _Feature_CardLabel) => void
  isChecked: boolean
  handleIncludeLabel: (label: _Feature_CardLabel) => void
  handleExcludeLabel: (label: _Feature_CardLabel) => void
  openEditLabelModal: () => void
}

export function CardLabelListTile({
  currentLabel,
  setSelectedLabel,
  isChecked,
  handleIncludeLabel,
  handleExcludeLabel,
  openEditLabelModal
}: CardLabelListTileProps) {
  const labelColor = labelColors[parseInt(currentLabel._id, 10)]
  const [isIncluded, setIsIncluded] = useState(isChecked)

  function handleToggleLabel() {
    setIsIncluded(!isIncluded)
    if (!isIncluded) {
      handleIncludeLabel(currentLabel)
    } else {
      handleExcludeLabel(currentLabel)
    }
  }

  return (
    <Box sx={{ width: '100%', height: 36, padding: '0 0 4px 4px' }} className='flex cursor-pointer'>
      <Box sx={{ width: 28, height: 32 }} className='flex items-center justify-start'>
        <input
          type='checkbox'
          style={{ width: 16, height: 16 }}
          className='cursor-pointer'
          checked={isIncluded}
          onChange={handleToggleLabel}
        />
      </Box>
      <Box
        sx={{
          bgcolor: labelColor,
          flex: 1,
          height: 32,
          padding: '0 12px',
          color: getContrastColor(labelColor),
          '&:hover': {
            filter: 'brightness(85%)'
          }
        }}
        className='mb-1 mr-1 flex items-center rounded text-sm font-semibold'
        onClick={handleToggleLabel}
      >
        {currentLabel.name}
      </Box>
      <Box
        sx={{ width: 32, height: 32, '&:hover': { bgcolor: colorsButton.secondary_hover } }}
        className='flex items-center justify-center'
        onClick={() => {
          setSelectedLabel(currentLabel)
          openEditLabelModal()
        }}
      >
        <FontAwesomeIcon icon={faPen} style={{ width: 16, height: 16, fontSize: 4 }} className='fa-light' />
      </Box>
    </Box>
  )
}

interface CardLabelListModalProps {
  anchorEl: null | HTMLDivElement
  setModalState: (newState: boolean[]) => void
  currentCard: _Card
  workspaceLabels: _Feature_CardLabel[]
  setSelectedLabel: (newState: _Feature_CardLabel) => void
  handleIncludeLabel: (card: _Feature_CardLabel) => void
  handleExcludeLabel: (card: _Feature_CardLabel) => void
}

export function CardLabelListModal({
  anchorEl,
  setModalState,
  currentCard,
  workspaceLabels,
  setSelectedLabel,
  handleIncludeLabel,
  handleExcludeLabel
}: CardLabelListModalProps) {
  const [searchValue, setSearchValue] = useState('')
  const [workspaceLabelState, setWorkspaceLabelState] = useState(workspaceLabels)

  function filterLabelList(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value)
    // Filter card member list
    setWorkspaceLabelState(
      workspaceLabels.filter((label) => label.name.toLowerCase().includes(event.currentTarget.value.toLowerCase()))
    )
  }

  function handleClose() {
    setModalState([false, false, false])
  }

  function openCreateLabelModal() {
    setModalState([false, true, false])
  }

  function openEditLabelModal() {
    setModalState([false, false, true])
  }

  function isLabelIncluded(label: _Feature_CardLabel): boolean {
    return currentCard.labels.some((_label) => _label._id === label._id && _label.name === label.name)
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
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Labels</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Search bar */}
        <input
          autoFocus
          style={{
            width: '100%',
            height: 32,
            margin: '0 0 10px 0',
            padding: '4px 6px',
            color: colors.primary,
            border: `2px solid ${colorsButton.secondary}`
          }}
          className='flex items-center text-sm'
          value={searchValue}
          onChange={(e) => filterLabelList(e)}
          placeholder='Search labels'
        />
        {/* Card member list */}
        <p style={{ margin: '10px 0', color: colors.primary }} className='text-xs font-semibold'>
          Labels
        </p>
        {workspaceLabelState.map((label, index) => (
          <CardLabelListTile
            key={index}
            currentLabel={label}
            setSelectedLabel={setSelectedLabel}
            isChecked={isLabelIncluded(label)}
            handleIncludeLabel={(label) => handleIncludeLabel(label)}
            handleExcludeLabel={(label) => handleExcludeLabel(label)}
            openEditLabelModal={openEditLabelModal}
          />
        ))}
        {/* Line */}
        <Box sx={{ width: '100%', height: 2, margin: '10px 0 4px 0', padding: '0 12px' }}>
          <Box sx={{ width: '100%', height: 2, bgcolor: colorsButton.secondary }}></Box>
        </Box>
        {/* Button */}
        <Box
          sx={{
            width: '100%',
            height: 32,
            margin: '10px 0',
            padding: '0 8px',
            bgcolor: colorsButton.secondary,
            '&:hover': {
              bgcolor: colorsButton.secondary_hover
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={openCreateLabelModal}
        >
          <h2 style={{ color: colors.primary }} className='text-sm font-semibold'>
            Create label
          </h2>
        </Box>
      </Box>
    </Popover>
  )
}

interface LabelColorTileProps {
  color: string
  isSelected: boolean
  setSelectedColor: (newState: string) => void
}

function LabelColorTile({ color, isSelected, setSelectedColor }: LabelColorTileProps) {
  function handleSelectColor() {
    setSelectedColor(color)
  }

  return (
    <Grid item xs={2.4}>
      <Box
        sx={{
          width: '100%',
          height: 32,
          padding: '1px',
          border: isSelected ? '2px solid #0C66E4' : 'none'
        }}
        className='flex items-center justify-center rounded-sm'
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: color,
            '&:hover': { filter: 'brightness(90%)' }
          }}
          className='cursor-pointer rounded-sm'
          onClick={handleSelectColor}
        ></Box>
      </Box>
    </Grid>
  )
}

function getContrastColor(hexColor: string) {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  // Choose black or white based on luminance
  return luminance > 0.588 ? '#533f04' : '#ffffff'
}

interface CreateCardLabelModalProps {
  anchorEl: (EventTarget & HTMLDivElement) | null
  setModalState: (newState: boolean[]) => void
  addWorkspaceLabel: (_id: string, name: string) => void
}

export function CreateCardLabelModal({ anchorEl, setModalState, addWorkspaceLabel }: CreateCardLabelModalProps) {
  const [labelNameFieldValue, setLabelNameFieldValue] = useState('')
  const [selectedColor, setSelectedColor] = useState(labelColors[0])

  function handleLabelNameFieldChange(event: ChangeEvent<HTMLInputElement>) {
    setLabelNameFieldValue(event.currentTarget.value)
  }

  function handleReturn() {
    setModalState([true, false])
  }

  function handleClose() {
    setModalState([false, false])
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
      <Box sx={{ width: 300, height: 'fit-content', color: colors.primary }} className='flex flex-col'>
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '8px 0 12px 0', padding: '0 8px' }}>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer' onMouseDown={handleReturn} />
          </Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Create label</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Label preview area */}
        <Box
          sx={{ width: '100%', height: 'fit-content', padding: '30px 20px', margin: '0 0 20px 0', bgcolor: '#f7f8f9' }}
          className='flex items-center justify-center'
        >
          <Box
            sx={{
              bgcolor: selectedColor,
              width: '100%',
              height: 32,
              padding: '0 12px',
              color: getContrastColor(selectedColor)
            }}
            className='flex items-center rounded text-sm font-semibold'
          >
            <p className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{labelNameFieldValue}</p>
          </Box>
        </Box>
        {/* Input label name */}
        <Box sx={{ width: '100%', height: 'fit-content', padding: '0 12px' }}>
          <p style={{ margin: '0 0 12px 0' }} className='text-xs font-semibold'>
            Title
          </p>
          <input
            autoFocus
            style={{
              width: '100%',
              height: 32,
              margin: '0 0 20px 0',
              padding: '4px 6px',
              color: colors.primary,
              border: '1px solid',
              borderColor: colorsButton.secondary_hover
            }}
            className='flex items-center rounded-sm text-sm'
            placeholder='Label name'
            value={labelNameFieldValue}
            onChange={(e) => handleLabelNameFieldChange(e)}
          />
        </Box>
        {/* Select color */}
        <Box sx={{ width: '100%', height: 'fit-content', padding: '0 12px' }}>
          <p style={{ margin: '0 0 12px 0' }} className='text-xs font-semibold'>
            Select a color
          </p>
          <Grid container spacing={1}>
            {labelColors.map((color, index) => (
              <LabelColorTile
                key={index}
                color={color}
                isSelected={selectedColor === color}
                setSelectedColor={setSelectedColor}
              />
            ))}
          </Grid>
        </Box>
        {/* Line */}
        <Box sx={{ width: '100%', height: 2, margin: '10px 0 10px 0', padding: '0 12px' }}>
          <Box sx={{ width: '100%', height: 2, bgcolor: colorsButton.secondary }}></Box>
        </Box>
        {/* Create button */}
        <Box
          sx={{
            bgcolor: '#0c66e4',
            width: 'fit-content',
            height: 32,
            margin: '0 0 10px 12px',
            padding: '0 12px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(90%)'
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={() => {
            addWorkspaceLabel(labelColors.indexOf(selectedColor).toString(), labelNameFieldValue)
            handleReturn()
          }}
        >
          <p>Create</p>
        </Box>
      </Box>
    </Popover>
  )
}

interface EditCardLabelModalProps {
  anchorEl: (EventTarget & HTMLDivElement) | null
  setModalState: (newState: boolean[]) => void
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  currentLabel: _Feature_CardLabel
  workspaceLabelState: _Feature_CardLabel[]
  setWorkspaceLabelState: (newState: _Feature_CardLabel[]) => void
  removeWorkspaceLabel: () => void
}

export function EditCardLabelModal({
  anchorEl,
  setModalState,
  currentCard,
  setCurrentCard,
  currentLabel,
  workspaceLabelState,
  setWorkspaceLabelState,
  removeWorkspaceLabel
}: EditCardLabelModalProps) {
  const [labelNameFieldValue, setLabelNameFieldValue] = useState(currentLabel.name)
  const [selectedColor, setSelectedColor] = useState(labelColors[parseInt(currentLabel._id, 10)])

  function handleLabelNameFieldChange(event: ChangeEvent<HTMLInputElement>) {
    setLabelNameFieldValue(event.currentTarget.value)
  }

  function handleEditWorkspaceLabel() {
    // Update Workspace label list
    const updateWorkspaceLabel = workspaceLabelState.map((label) => {
      return label._id === currentLabel._id
        ? { _id: labelColors.indexOf(selectedColor).toString(), name: labelNameFieldValue }
        : label
    })
    setWorkspaceLabelState(updateWorkspaceLabel)
    // Update Card
    const updatedCard = {
      ...currentCard,
      labels: currentCard.labels.map((label) => {
        return label._id === currentLabel._id
          ? { _id: labelColors.indexOf(selectedColor).toString(), name: labelNameFieldValue }
          : label
      })
    }
    setCurrentCard(updatedCard)
  }

  function handleReturn() {
    setModalState([true, false])
  }

  function handleClose() {
    setModalState([false, false])
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
      <Box sx={{ width: 300, height: 'fit-content', color: colors.primary }} className='flex flex-col'>
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '8px 0 12px 0', padding: '0 8px' }}>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer' onMouseDown={handleReturn} />
          </Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Edit label</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Label preview area */}
        <Box
          sx={{ width: '100%', height: 'fit-content', padding: '30px 20px', margin: '0 0 20px 0', bgcolor: '#f7f8f9' }}
          className='flex items-center justify-center'
        >
          <Box
            sx={{
              bgcolor: selectedColor,
              width: '100%',
              height: 32,
              padding: '0 12px',
              color: getContrastColor(selectedColor)
            }}
            className='flex items-center rounded text-sm font-semibold'
          >
            <p className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{labelNameFieldValue}</p>
          </Box>
        </Box>
        {/* Input label name */}
        <Box sx={{ width: '100%', height: 'fit-content', padding: '0 12px' }}>
          <p style={{ margin: '0 0 12px 0' }} className='text-xs font-semibold'>
            Title
          </p>
          <input
            autoFocus
            style={{
              width: '100%',
              height: 32,
              margin: '0 0 20px 0',
              padding: '4px 6px',
              color: colors.primary,
              border: '1px solid',
              borderColor: colorsButton.secondary_hover
            }}
            className='flex items-center rounded-sm text-sm'
            placeholder='Label name'
            value={labelNameFieldValue}
            onChange={(e) => handleLabelNameFieldChange(e)}
          />
        </Box>
        {/* Select color */}
        <Box sx={{ width: '100%', height: 'fit-content', padding: '0 12px' }}>
          <p style={{ margin: '0 0 12px 0' }} className='text-xs font-semibold'>
            Select a color
          </p>
          <Grid container spacing={1}>
            {labelColors.map((color, index) => (
              <LabelColorTile
                key={index}
                color={color}
                isSelected={selectedColor === color}
                setSelectedColor={setSelectedColor}
              />
            ))}
          </Grid>
        </Box>
        {/* Line */}
        <Box sx={{ width: '100%', height: 2, margin: '10px 0 10px 0', padding: '0 12px' }}>
          <Box sx={{ width: '100%', height: 2, bgcolor: colorsButton.secondary }}></Box>
        </Box>
        {/* Create button */}
        <Box sx={{ width: '100%', height: 'fit-content' }} className='flex flex-row justify-between'>
          <Box
            sx={{
              bgcolor: '#0c66e4',
              width: 'fit-content',
              height: 32,
              margin: '0 0 10px 12px',
              padding: '0 12px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              '&:hover': {
                filter: 'brightness(90%)'
              }
            }}
            className='flex cursor-pointer items-center justify-center rounded'
            onClick={() => {
              handleEditWorkspaceLabel()
              handleReturn()
            }}
          >
            <p>Save</p>
          </Box>
          <Box
            sx={{
              bgcolor: '#C9372C',
              width: 'fit-content',
              height: 32,
              margin: '0 12px 10px 0',
              padding: '0 12px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              '&:hover': {
                filter: 'brightness(90%)'
              }
            }}
            className='flex cursor-pointer items-center justify-center rounded'
            onClick={() => {
              removeWorkspaceLabel()
              handleReturn()
            }}
          >
            <p>Delete</p>
          </Box>
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
