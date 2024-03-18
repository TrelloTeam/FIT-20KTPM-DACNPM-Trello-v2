import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Box, Grid, Stack } from '@mui/material'
import { colors, colorsButton } from '~/styles'
import CardMemberList from './CardMemberList'
import CardLabelList from './CardLabelList'
import CardNotification from './CardNotification'
import { useState } from 'react'
import CardDate from './CardDate'
import CardDescription from './CardDescription'
import CardChecklist from './CardChecklist'
import CardActivity from './CardActivity'
import { ButtonType } from './sidebar/CardSidebarButton'
import { SidebarButtonLabels } from './sidebar/CardLabelSidebar'
import { SidebarButtonMembers } from './sidebar/CardMemberSidebar'
import { SidebarButtonChecklist } from './sidebar/CardChecklistSidebar'
import { SidebarButtonDates } from './sidebar/CardDateSidebar'
import dayjs, { Dayjs } from 'dayjs'
import { SidebarButtonAttachments } from './sidebar/CardAttachmentSidebar'
import { CardAttachment } from './CardAttachment'
import { SidebarButtonMove } from './sidebar/CardMoveSidebar'
import { SidebarButtonCopy } from './sidebar/CardCopySidebar'
import { SidebarButtonArchive } from './sidebar/CardArchiveSidebar'
import { useTheme } from '../Theme/themeContext'

export type _Card = {
  name: string
  description: string
  watcher_email: string[]
  labels: _Feature_CardLabel[]
  checklists: _Feature_Checklist[]
  dates: _Feature_Date
  attachments: _Feature_Attachment[]
  activities: _Feature_Activity[]
}

export type _Feature_CardLabel = {
  _id: string
  name: string
}

export type _Feature_Checklist = {
  _id: string
  name: string
  type: string
  items: _Feature_Checklist_Item[]
}

export type _Feature_Checklist_Item = {
  _id: string
  name: string
  is_check: boolean
}

export type _Feature_Date = {
  _id: string
  type: string
  start_date: Dayjs | null
  due_date: Dayjs | null
}

export type _Feature_Attachment = {
  _id: string
  type: string
  link: string
  title: string
}

export type _Feature_Activity = {
  workspace_id: string
  board_id: string
  cardlist_id: string
  card_id: string
  content: string
  time: string
}

const checklist_1: _Feature_Checklist = {
  _id: '0',
  name: 'Front-end Boards Page',
  type: 'checklist',
  items: [
    { _id: '0', name: 'Component design', is_check: false },
    { _id: '1', name: 'State management', is_check: false },
    { _id: '2', name: 'Data fetching', is_check: false },
    { _id: '3', name: 'Event handling', is_check: false },
    { _id: '4', name: 'Testing', is_check: false },
    { _id: '5', name: 'Code review', is_check: false },
    { _id: '6', name: 'Pull request approved', is_check: false }
  ]
}

const checklist_2: _Feature_Checklist = {
  _id: '1',
  name: 'Front-end Card Detail Window',
  type: 'checklist',
  items: [
    { _id: '0', name: 'Component design', is_check: false },
    { _id: '1', name: 'State management', is_check: false },
    { _id: '2', name: 'Data fetching', is_check: false },
    { _id: '3', name: 'Event handling', is_check: false },
    { _id: '4', name: 'Testing', is_check: false },
    { _id: '5', name: 'Code review', is_check: false },
    { _id: '6', name: 'Pull request approved', is_check: false }
  ]
}

const card_dates: _Feature_Date = {
  _id: '2',
  type: 'date',
  start_date: dayjs(),
  due_date: dayjs().add(1, 'day')
}

const card_attachments: _Feature_Attachment[] = [
  {
    _id: '0',
    type: 'attachment',
    link: 'https://www.google.com',
    title: 'Google'
  }
]

const card_activities: _Feature_Activity[] = [
  {
    workspace_id: '0',
    board_id: '0',
    cardlist_id: '0',
    card_id: '0',
    content: 'TrelloUser added attachment',
    time: '2024-03-15 12:30:00'
  },
  {
    workspace_id: '0',
    board_id: '0',
    cardlist_id: '0',
    card_id: '1',
    content: 'TrelloUser added checklist',
    time: '2024-03-14 15:30:00'
  },
  {
    workspace_id: '0',
    board_id: '0',
    cardlist_id: '0',
    card_id: '2',
    content: 'TrelloUser archived this card',
    time: '2024-03-15 15:00:00'
  },
  {
    workspace_id: '0',
    board_id: '0',
    cardlist_id: '0',
    card_id: '3',
    content: 'TrelloUser removed AnotherMember from this card',
    time: '2024-03-12 15:00:00'
  }
]

const card_1: _Card = {
  name: 'Soạn nội dung thuyết trình',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id diam maecenas ultricies mi eget. Morbi tincidunt augue interdum velit euismod. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Sed vulputate mi sit amet mauris commodo quis. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Eu volutpat odio facilisis mauris.',
  watcher_email: ['reactjs@gmail.com', 'nodejs@gmail.com', 'tailwindcss@gmail.com', 'materialui@gmail.com'],
  labels: [
    { _id: '5', name: 'Đã hoàn thành' },
    { _id: '6', name: 'Sắp hoàn thành' },
    { _id: '7', name: 'Gấp' },
    { _id: '13', name: 'Không kịp tiến độ' }
  ],
  checklists: [checklist_1, checklist_2],
  dates: card_dates,
  attachments: card_attachments,
  activities: card_activities
}

const boardMembers: string[] = [
  'reactjs@gmail.com',
  'nodejs@gmail.com',
  'tailwindcss@gmail.com',
  'materialui@gmail.com',
  'restjs@gmail.com',
  'mongodb@gmail.com'
]

const boardLabels: _Feature_CardLabel[] = [
  { _id: '5', name: 'Đã hoàn thành' },
  { _id: '6', name: 'Sắp hoàn thành' },
  { _id: '7', name: 'Gấp' },
  { _id: '13', name: 'Không kịp tiến độ' },
  { _id: '9', name: '' },
  { _id: '20', name: '' },
  { _id: '14', name: '' }
]

export default function CardDetailWindow() {
  const focusInputColor = '#0ff'

  const { colors } = useTheme()
  const [boardLabelState, setBoardLabelState] = useState(boardLabels)
  const [currentCardState, setCurrentCardState] = useState(card_1)
  const [cardNameFieldValue, setCardNameFieldValue] = useState(card_1.name)
  const [initialCardNameFieldValue, setInitialCardNameFieldValue] = useState(card_1.name)
  const [isWatching, setIsWatching] = useState(false)

  function handleCardNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCardNameFieldValue(event.target.value)
    const trimmedValue = cardNameFieldValue.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialCardNameFieldValue.trim()) {
      setCurrentCardState({
        ...currentCardState,
        name: trimmedValue
      })
      setInitialCardNameFieldValue(trimmedValue)
    }
  }

  function handleCardNameFieldBlur() {
    const trimmedValue = cardNameFieldValue.replace(/\s+/g, ' ').trim()
    if (trimmedValue !== initialCardNameFieldValue.trim()) {
      setCurrentCardState({
        ...currentCardState,
        name: trimmedValue
      })
      setInitialCardNameFieldValue(trimmedValue)
    } else {
      setCardNameFieldValue(initialCardNameFieldValue)
    }
  }

  function handleNotification() {
    setIsWatching(!isWatching)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'rgba(0, 0, 0, 0.64)' }} className='flex justify-center'>
      <Box
        sx={{
          width: 768,
          height: 'fit-content',
          marginBottom: '80px',
          paddingBottom: '40px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          backgroundColor: colors.background_modal,
          color: colors.text
        }}
        className='m-auto rounded-2xl'
      >
        {/* START: Header */}
        <Box sx={{ width: '100%', height: 89, padding: '8px 0' }} className='flex flex-row'>
          <Box sx={{ width: 46 }}>
            <Box sx={{ padding: '14px 0 0 20px' }}>
              <FontAwesomeIcon icon={faCreditCard} style={{ color: colors.text, width: 20, height: 20 }} />
            </Box>
          </Box>
          <Box sx={{ width: 660, padding: '6px 0' }}>
            <input
              type='text'
              style={{
                width: '100%',
                height: '37px',
                padding: '6px 10px',
                backgroundColor: colors.background_modal
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = focusInputColor
                e.currentTarget.style.backgroundColor = colors.background_modal_tertiary
              }}
              onBlur={(e) => {
                handleCardNameFieldBlur
                e.currentTarget.style.backgroundColor = colors.background_modal
              }}
              value={cardNameFieldValue}
              onChange={(e) => handleCardNameChange(e)}
              className='text-xl font-semibold'
            />
            <Box
              sx={{ height: '20px', padding: '0 0 0 10px', color: colors.text }}
              className='flex flex-row items-center text-sm'
            >
              <p style={{ marginRight: '4px' }}>in list</p>
              <p style={{ marginRight: '16px' }} className='cursor-pointer font-medium underline'>
                Doing
              </p>
              {isWatching && <FontAwesomeIcon icon={faEye} />}
            </Box>
          </Box>
          <Box sx={{ width: 52, padding: '7px 6px 0 0' }} className='flex items-start justify-end'>
            <Box
              sx={{ width: 40, height: 40, '&:hover': { bgcolor: colors.button_hover } }}
              className='flex cursor-pointer items-center justify-center rounded-full'
            >
              <FontAwesomeIcon icon={faTimes} style={{ color: colors.text, width: 20, height: 20 }} />
            </Box>
          </Box>
        </Box>
        {/* END: Header */}
        {/* START: Body */}
        <Grid container>
          <Grid item xs={9} sx={{ padding: '0 8px 8px 16px' }}>
            {/* START: Hero */}
            <div style={{ padding: '0 0 0 40px' }} className='flex flex-row flex-wrap gap-1'>
              <CardMemberList
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
                boardMembers={boardMembers}
              />
              <CardLabelList
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
                boardLabelState={boardLabelState}
                setBoardLabelState={setBoardLabelState}
              />
              <CardNotification isWatching={isWatching} setIsWatching={handleNotification} />
              <CardDate currentCard={currentCardState} setCurrentCard={setCurrentCardState} />
            </div>
            {/* END: Hero */}
            {/* START: Description */}
            <CardDescription currentCard={currentCardState} setCurrentCard={setCurrentCardState} />
            {/* END: Description */}
            {/* START: Attachment */}
            <CardAttachment currentCard={currentCardState} setCurrentCard={setCurrentCardState} />
            {/* END: Attachment */}
            {/* START: Checklist */}
            {currentCardState.checklists.map((checklist) => (
              <CardChecklist
                key={checklist._id}
                currentChecklist={checklist}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
            ))}
            {/* END: Checklist */}
            <CardActivity currentCard={currentCardState} setCurrentCard={setCurrentCardState} />
          </Grid>
          <Grid item xs={3} sx={{ padding: '0 16px 8px 8px' }}>
            <Stack sx={{ padding: '10px 0 0 0' }}>
              <h2 style={{ color: colors.text }} className='mb-2 text-xs font-bold'>
                Add to card
              </h2>
              <SidebarButtonMembers
                type={ButtonType.Members}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
                boardMembers={boardMembers}
              />
              <SidebarButtonLabels
                type={ButtonType.Labels}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
                boardLabelState={boardLabelState}
                setBoardLabelState={setBoardLabelState}
              />
              <SidebarButtonChecklist
                type={ButtonType.Checklists}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
              <SidebarButtonDates
                type={ButtonType.Dates}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
              <SidebarButtonAttachments
                type={ButtonType.Attachments}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
              <h2 style={{ color: colors.text }} className='mb-2 mt-6 text-xs font-bold'>
                Actions
              </h2>
              <SidebarButtonMove
                type={ButtonType.Move}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
              <SidebarButtonCopy
                type={ButtonType.Copy}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
              <Box sx={{ width: '100%', height: 2, padding: '0 0 10px 0' }}>
                <Box sx={{ width: '100%', height: 2, bgcolor: colorsButton.secondary }}></Box>
              </Box>
              <SidebarButtonArchive
                type={ButtonType.Archive}
                currentCard={currentCardState}
                setCurrentCard={setCurrentCardState}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* END: Body */}
      </Box>
    </Box>
  )
}
