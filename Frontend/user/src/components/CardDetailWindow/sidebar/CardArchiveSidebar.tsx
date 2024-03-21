import { _Card } from '..'
import { ButtonType, SidebarButton, buttonTypeIconMap } from './CardSidebarButton'
import { Box } from '@mui/material'

interface SidebarButtonArchiveProps {
  type: ButtonType
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export function SidebarButtonArchive({ type, currentCard, setCurrentCard }: SidebarButtonArchiveProps) {
  function handleCardArchive() {
    console.log('Card archive not implemented yet.')
  }

  return (
    <Box>
      <SidebarButton
        icon={buttonTypeIconMap[type]}
        title={type}
        onClick={() => {
          handleCardArchive()
        }}
      />
    </Box>
  )
}
