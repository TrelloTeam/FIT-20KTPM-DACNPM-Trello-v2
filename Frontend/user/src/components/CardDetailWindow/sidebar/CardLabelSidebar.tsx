import { useRef, useState } from 'react'
import { _Card, _Feature_CardLabel } from '..'
import { CardLabelListModal, CreateCardLabelModal, EditCardLabelModal } from '../modals/CardLabelModal'
import { ButtonType, SidebarButton, buttonTypeIconMap } from './CardSidebarButton'
import { Box } from '@mui/material'

interface SidebarButtonLabelsProps {
  type: ButtonType
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  boardLabelState: _Feature_CardLabel[]
  setBoardLabelState: (newState: _Feature_CardLabel[]) => void
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
  const [modalState, setModalState] = useState([false, false, false])
  const [selectedLabel, setSelectedLabel] = useState(boardLabelState[0])

  function openModal(modalIndex: number) {
    const updatedOpenModal = modalState.map((state, index) => (index === modalIndex ? true : state))
    setModalState(updatedOpenModal)
  }

  function addBoardLabel(_id: string, name: string) {
    const newBoardLabel: _Feature_CardLabel = {
      _id: _id,
      name: name
    }
    setBoardLabelState([...boardLabelState, newBoardLabel])
  }

  function isLabelIncluded(label: _Feature_CardLabel): boolean {
    return currentCard.labels.some((_label) => _label._id === label._id && _label.name === label.name)
  }

  function removeBoardLabel() {
    // Remove label from Board
    const updatedBoardLabelList = boardLabelState.filter((label) => label._id !== selectedLabel._id)
    setBoardLabelState(updatedBoardLabelList)
    // Remove label from Card as well
    if (isLabelIncluded(selectedLabel)) {
      const updatedCard = {
        ...currentCard,
        labels: currentCard.labels.filter((label) => label._id !== selectedLabel._id)
      }
      setCurrentCard(updatedCard)
    }
  }

  function handleIncludeLabel(label: _Feature_CardLabel) {
    const updatedCard = {
      ...currentCard,
      labels: [...currentCard.labels, label]
    }
    setCurrentCard(updatedCard)
  }

  function handleExcludeLabel(label: _Feature_CardLabel) {
    const updatedCard = {
      ...currentCard,
      labels: currentCard.labels.filter((_label) => _label._id !== label._id)
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
