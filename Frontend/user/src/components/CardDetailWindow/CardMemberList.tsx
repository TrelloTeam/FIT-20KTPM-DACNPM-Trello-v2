import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Tooltip } from '@mui/material'
import { useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { _Card } from '.'
import { CardMemberModal } from './modals/CardMemberModal'

// eslint-disable-next-line react-refresh/only-export-components
export const bgColors: string[] = ['#8a2be2', '#1e90ff', '#66cdaa', '#ffa500', '#FFD700', '#DC143C']

const getContrastColor = (hexColor: string) => {
  if (!hexColor) {
    return '#ffffff'
  }
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white based on luminance
  return luminance > 0.5 ? colors.primary : '#ffffff'
}

interface MemberAvatarProps {
  memberName: string
  bgColor: string
}

export function MemberAvatar({ memberName, bgColor }: MemberAvatarProps) {
  const textColor = getContrastColor(bgColor)

  return (
    <Avatar
      sx={{
        bgcolor: bgColor,
        width: 32,
        height: 32,
        color: textColor,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          filter: 'brightness(85%)'
        }
      }}
      className='cursor-pointer'
    >
      {memberName}
    </Avatar>
  )
}

interface AddMemberButtonProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  boardMembers: string[]
}

function AddMemberButton({ currentCard, setCurrentCard, boardMembers }: AddMemberButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenCardMemberModal, setIsOpenCardMemberModal] = useState(false)

  function openCardMemberModal(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpenCardMemberModal(true)
  }

  function handleClose() {
    setIsOpenCardMemberModal(false)
  }

  return (
    <div>
      <Avatar
        sx={{
          bgcolor: colorsButton.secondary,
          width: 32,
          height: 32,
          color: colors.primary,
          fontSize: 14,
          fontWeight: 500,
          '&:hover': {
            bgcolor: colorsButton.secondary_hover
          }
        }}
        className='cursor-pointer'
        onBlur={handleClose}
        onClick={(e) => openCardMemberModal(e)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Avatar>
      {isOpenCardMemberModal && (
        <CardMemberModal
          anchorEl={anchorEl}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          boardMembers={boardMembers}
          handleClose={handleClose}
        />
      )}
    </div>
  )
}

interface CardMemberListProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  boardMembers: string[]
}

export default function CardMemberList({ currentCard, setCurrentCard, boardMembers }: CardMemberListProps) {
  return (
    <Box sx={{ margin: '10px 16px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Members
      </h2>
      <div className='flex flex-row space-x-1'>
        {currentCard.watcher_email.map((email, index) => (
          <Tooltip key={index} title={email} arrow>
            <div style={{ display: 'inline-block' }}>
              <MemberAvatar memberName={email.slice(0, 2).toUpperCase()} bgColor={bgColors[index]} />
            </div>
          </Tooltip>
        ))}
        <AddMemberButton currentCard={currentCard} setCurrentCard={setCurrentCard} boardMembers={boardMembers} />
      </div>
    </Box>
  )
}
