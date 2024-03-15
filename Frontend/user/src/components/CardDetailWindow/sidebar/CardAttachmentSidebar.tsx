import { useRef, useState } from 'react'
import { _Card } from '..'
import { ButtonType, SidebarButton, buttonTypeIconMap } from './CardSidebarButton'
import { Box } from '@mui/material'
import { CardAttachmentModal } from '../modals/CardAttachmentModal'

interface SidebarButtonAttachmentsProps {
  type: ButtonType
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export function SidebarButtonAttachments({ type, currentCard, setCurrentCard }: SidebarButtonAttachmentsProps) {
  const boxRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  return (
    <Box ref={boxRef}>
      <SidebarButton
        icon={buttonTypeIconMap[type]}
        title={type}
        onClick={() => {
          setAnchorEl(boxRef.current)
          handleOpenModal()
        }}
      />
      {/* Modals */}
      {isOpenModal && (
        <CardAttachmentModal
          anchorEl={anchorEl}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          handleClose={handleCloseModal}
        />
      )}
    </Box>
  )
}
