import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { colors, colorsButton } from '~/styles'
import { _Card, _Feature_CardLabel } from '.'
import { useRef, useState } from 'react'
import { CardLabelListModal, CreateCardLabelModal, EditCardLabelModal } from './modals/CardLabelModal'

// eslint-disable-next-line react-refresh/only-export-components
export const labelColors: string[] = [
  '#BAF3DB', //  0 - subtle green
  '#F8E6A0', //  1 - subtle yellow
  '#FEDEC8', //  2 - subtle orange
  '#FFD5D2', //  3 - subtle red
  '#DFD8FD', //  4 - subtle purple
  '#4BCE97', //  5 - green
  '#F5CD47', //  6 - yellow
  '#FEA362', //  7 - orange
  '#F87168', //  8 - red
  '#9F8FEF', //  9 - purple
  '#1F845A', // 10 - bold green
  '#946F00', // 11 - bold yellow
  '#C25100', // 12 - bold orange
  '#C9372C', // 13 - bold red
  '#CE5DC6', // 14 - bold purple
  '#CCE0FF', // 15 - subtle blue
  '#C6EDFB', // 16 - subtle sky
  '#D3F1A7', // 17 - subtle lime
  '#FDD0EC', // 18 - subtle pink
  '#DCDFE4', // 19 - subtle black
  '#579DFF', // 20 - blue
  '#6CC3E0', // 21 - sky
  '#94C748', // 22 - lime
  '#E774BB', // 23 - pink
  '#8590A2', // 24 - black
  '#0C66E4', // 25 - bold blue
  '#227D9B', // 26 - bold sky
  '#5B7F24', // 27 - bold lime
  '#AE4787', // 28 - bold pink
  '#626F86' //  29 - bold black
]

const getContrastColor = (hexColor: string) => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white based on luminance
  return luminance > 0.588 ? '#533f04' : '#ffffff'
}

interface CardLabelItemProps {
  title: string
  bgColor: string
}

export function CardLabelItem({ title, bgColor }: CardLabelItemProps) {
  const textColor = getContrastColor(bgColor)

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        color: textColor,
        '&:hover': {
          filter: 'brightness(85%)'
        }
      }}
      className='mb-1 mr-1 flex cursor-pointer items-center rounded text-sm font-semibold'
    >
      {title}
    </Box>
  )
}

interface CardLabelListProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  boardLabelState: _Feature_CardLabel[]
  setBoardLabelState: (newState: _Feature_CardLabel[]) => void
}

export default function CardLabelList({
  currentCard,
  setCurrentCard,
  boardLabelState,
  setBoardLabelState
}: CardLabelListProps) {
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
    <Box ref={boxRef} sx={{ margin: '10px 20px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Labels
      </h2>
      <div className='flex flex-row flex-wrap'>
        {currentCard.labels.map((label) => (
          <CardLabelItem key={label._id} title={label.name} bgColor={labelColors[parseInt(label._id, 10)]} />
        ))}
        <Box
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
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={() => {
            setAnchorEl(boxRef.current)
            openModal(0)
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Box>
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
      </div>
    </Box>
  )
}
