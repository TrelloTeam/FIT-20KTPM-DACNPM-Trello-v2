import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Tooltip } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { colors, colorsButton } from '~/styles'
import { SelectCardDatesModal } from './modals/CardDateModal'
import { _Card } from '.'
import dayjs, { Dayjs } from 'dayjs'

type CardStatus = 'complete' | 'overdue' | ''

interface StatusTagProps {
  cardDateStatus: CardStatus
}

function getTooltipTitle(isOpenModal: boolean, cardStatus: CardStatus): string {
  if (isOpenModal) {
    return ''
  } else {
    switch (cardStatus) {
      case 'complete':
        return 'This card is complete.'
      case 'overdue':
        return 'This card is past due.'
      default:
        return 'This card is due later.'
    }
  }
}

function StatusTag({ cardDateStatus }: StatusTagProps) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        height: 16,
        padding: '0 4px',
        bgcolor: cardDateStatus === 'complete' ? '#008000' : '#fff0f5',
        color: cardDateStatus === 'complete' ? '#fff' : '#f00'
      }}
      className='flex items-center justify-center rounded text-sm font-semibold'
    >
      <p>{cardDateStatus}</p>
    </Box>
  )
}

interface CardDateProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export default function CardDate({ currentCard, setCurrentCard }: CardDateProps) {
  const boxRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [cardDateStatus, setCardDateStatus] = useState<CardStatus>('')
  const [cardDateVisible, setCardDateVisible] = useState(true)

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function handleCheckboxClick() {
    setIsComplete(!isComplete)
  }

  let datesText = ''
  const startDate: Dayjs | null = currentCard.dates.start_date
  const dueDate: Dayjs | null = currentCard.dates.due_date

  if (startDate || dueDate) {
    const startDateFormat = startDate ? `${startDate.format('MMM')} ${startDate.format('D')}` : ''
    const dueDateFormat = dueDate ? `${dueDate.format('MMM')} ${dueDate.format('D')}` : ''
    const timeFormat = dueDate ? ` at ${dueDate.format('h:mm A')}` : ''
    datesText = `${startDateFormat} ${startDate && dueDate ? '-' : ''} ${dueDateFormat}${timeFormat}`
  } else {
    datesText = ''
  }

  useEffect(() => {
    datesText === '' ? setCardDateVisible(false) : setCardDateVisible(true)
  }, [datesText])

  useEffect(() => {
    if (isComplete) {
      setCardDateStatus('complete')
    } else if (dueDate && dueDate.isBefore(dayjs())) {
      setCardDateStatus('overdue')
    } else {
      setCardDateStatus('')
    }
  }, [dueDate, isComplete])

  return (
    <Box>
      {cardDateVisible && (
        <Tooltip
          title={getTooltipTitle(isOpenModal, cardDateStatus)}
          placement='bottom-start'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [18, -12]
                  }
                }
              ]
            }
          }}
        >
          <Box sx={{ margin: '10px 20px 0 0' }}>
            <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
              {startDate && !dueDate ? 'Start date' : 'Dates'}
            </h2>
            <Box className='flex flex-row gap-2'>
              {!(startDate && !dueDate) && (
                <input type='checkbox' className='cursor-pointer' onClick={handleCheckboxClick} />
              )}
              <Box
                ref={boxRef}
                sx={{
                  boxsizing: 'content-box',
                  width: 'fit-content',
                  height: 32,
                  bgcolor: colorsButton.secondary,
                  padding: '0px 12px 0 12px',
                  color: colors.primary,
                  '&:hover': {
                    bgcolor: colorsButton.secondary_hover
                  }
                }}
                className='flex cursor-pointer flex-row flex-wrap items-center gap-2 rounded'
                onClick={() => {
                  setAnchorEl(boxRef.current)
                  handleOpenModal()
                }}
              >
                <p className='text-sm font-semibold'>{datesText}</p>
                <Box
                  sx={{ width: 'fit-content', height: 24, color: colors.primary }}
                  className='flex items-center justify-center gap-2 text-sm'
                >
                  {cardDateStatus !== '' && <StatusTag cardDateStatus={cardDateStatus} />}
                  <FontAwesomeIcon icon={faChevronDown} />
                </Box>
              </Box>
            </Box>
            {isOpenModal && (
              <SelectCardDatesModal
                anchorEl={anchorEl}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                handleClose={handleCloseModal}
              />
            )}
          </Box>
        </Tooltip>
      )}
    </Box>
  )
}
