import { useRef, useState } from 'react'
import { _Card } from '..'
import { ButtonType, SidebarButton, buttonTypeIconMap } from './CardSidebarButton'
import { Box } from '@mui/material'
import { CardMemberModal } from '../modals/CardMemberModal'

interface SidebarButtonMembersProps {
  type: ButtonType
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  boardMembers: string[]
}

export function SidebarButtonMembers({ type, currentCard, setCurrentCard, boardMembers }: SidebarButtonMembersProps) {
  const boxRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenCardMemberModal, setIsOpenCardMemberModal] = useState(false)

  function openCardMemberModal() {
    setIsOpenCardMemberModal(true)
  }

  function handleClose() {
    setIsOpenCardMemberModal(false)
  }

  return (
    <Box ref={boxRef}>
      <SidebarButton
        icon={buttonTypeIconMap[type]}
        title={type}
        onClick={() => {
          setAnchorEl(boxRef.current)
          openCardMemberModal()
        }}
      />
      {/* Modals */}
      {isOpenCardMemberModal && (
        <CardMemberModal
          anchorEl={anchorEl}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          boardMembers={boardMembers}
          handleClose={handleClose}
        />
      )}
    </Box>
  )
}
