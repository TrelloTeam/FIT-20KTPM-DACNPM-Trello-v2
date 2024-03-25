import { useRef, useState } from 'react'
import { CardLabelListModal, CreateCardLabelModal, EditCardLabelModal } from '../modals/CardLabelModal'
import { ButtonType, SidebarButton, buttonTypeIconMap } from './CardSidebarButton'
import { Box } from '@mui/material'
import { Card } from '@trello-v2/shared/src/schemas/CardList'
import { Feature_CardLabel } from '@trello-v2/shared/src/schemas/Feature'

interface SidebarButtonLabelsProps {
  type: ButtonType
  currentCard: Card
  setCurrentCard: (newState: Card) => void
  boardLabelState: Feature_CardLabel[]
  setBoardLabelState: (newState: Feature_CardLabel[]) => void
}

export function SidebarButtonLabels({
  type,
  currentCard,
  setCurrentCard,
  boardLabelState,
  setBoardLabelState
}: SidebarButtonLabelsProps) {
  const boxRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [modalState, setModalState] = useState<boolean[]>([false, false, false])
  const [selectedLabel, setSelectedLabel] = useState<Feature_CardLabel>(boardLabelState[0])

  function openModal(modalIndex: number) {
    const updatedOpenModal = modalState.map((state, index) => (index === modalIndex ? true : state))
    setModalState(updatedOpenModal)
  }

  function addBoardLabel(_id: string) {
    const newBoardLabel: Feature_CardLabel = {
      type: 'label',
      label_id: _id
      // name: name
    }
    setBoardLabelState([...boardLabelState, newBoardLabel])
  }

  function isLabelIncluded(label: Feature_CardLabel): boolean {
    return currentCard.features.some((feature) => {
      if (feature.type === 'label' && feature.label_id === label._id) {
        return true
      }
      return false
    })
  }

  function removeBoardLabel() {
    // Remove label from Board
    const updatedBoardLabelList = boardLabelState.filter((label) => label._id !== selectedLabel._id)
    setBoardLabelState(updatedBoardLabelList)
    // Remove label from Card as well
    if (isLabelIncluded(selectedLabel)) {
      const updatedCard = {
        ...currentCard,
        labels: currentCard.features.filter((feature) => feature.type === 'label' && feature._id !== selectedLabel._id)
      }
      setCurrentCard(updatedCard)
    }
  }

  function handleIncludeLabel(label: Feature_CardLabel) {
    const updatedCard: Card = {
      ...currentCard,
      features: [...currentCard.features, label]
    }
    setCurrentCard(updatedCard)
  }

  function handleExcludeLabel(label: Feature_CardLabel) {
    const updatedCard: Card = {
      ...currentCard,
      features: currentCard.features.filter((feature) => feature.type === 'label' && feature._id !== label._id)
    }
    setCurrentCard(updatedCard)
  }

  return (
    <Box ref={boxRef}>
      <SidebarButton
        icon={buttonTypeIconMap[type]}
        title={type}
        onClick={() => {
          setAnchorEl(boxRef.current)
          openModal(0)
        }}
      />
      {/* Modals */}
      {modalState[0] && (
        <CardLabelListModal
          anchorEl={anchorEl}
          setModalState={setModalState}
          currentCard={currentCard}
          boardLabels={boardLabelState}
          setSelectedLabel={setSelectedLabel}
          handleIncludeLabel={handleIncludeLabel}
          handleExcludeLabel={handleExcludeLabel}
        />
      )}
      {modalState[1] && (
        <CreateCardLabelModal anchorEl={anchorEl} setModalState={setModalState} addBoardLabel={addBoardLabel} />
      )}
      {modalState[2] && (
        <EditCardLabelModal
          anchorEl={anchorEl}
          setModalState={setModalState}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          currentLabel={selectedLabel}
          boardLabelState={boardLabelState}
          setBoardLabelState={setBoardLabelState}
          removeBoardLabel={removeBoardLabel}
        />
      )}
    </Box>
  )
}
