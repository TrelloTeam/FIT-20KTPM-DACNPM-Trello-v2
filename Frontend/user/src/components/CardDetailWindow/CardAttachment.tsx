import { Box } from '@mui/material'
import { _Card, _Feature_Attachment } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { CardAttachmentModal } from './modals/CardAttachmentModal'
import { useTheme } from '../Theme/themeContext'

type AttachmentType = 'file' | 'link'

interface CardAttachmentProps {
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
}

export function CardAttachment({ currentCard, setCurrentCard }: CardAttachmentProps) {
  const { colors } = useTheme()
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
    <Box sx={{ width: '100%', height: 'fit-content', margin: '20px 0' }} className='flex flex-col'>
      {currentCard.attachments.length !== 0 && (
        <>
          <Box
            sx={{ width: '100%', height: 32, marginBottom: '16px', color: colors.text }}
            className='flex flex-row items-center justify-between'
          >
            {/* Title */}
            <Box sx={{ width: 'fit-content', height: 32 }} className='flex flex-row items-center'>
              <FontAwesomeIcon icon={faPaperclip} style={{ width: 36, marginRight: '6px' }} className='text-xl' />
              <h2 className='font-semibold'>Attachments</h2>
            </Box>
            {/* Button */}
            <Box
              ref={boxRef}
              sx={{
                bgcolor: colors.button,
                width: 'fit-content',
                height: 32,
                padding: '0 12px',
                color: colors.text,
                fontSize: 14,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: colors.button_hover
                }
              }}
              className='flex cursor-pointer items-center justify-center rounded'
              onClick={() => {
                setAnchorEl(boxRef.current)
                handleOpenModal()
              }}
            >
              <p>Add</p>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: 'fit-content', paddingLeft: '42px' }} className='flex flex-col'>
            {currentCard.attachments.map((attachment, index) => (
              <CardAttachmentTile key={index} type='link' attachment={attachment} />
            ))}
          </Box>
          {isOpenModal && (
            <CardAttachmentModal
              anchorEl={anchorEl}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
              handleClose={handleCloseModal}
            />
          )}
        </>
      )}
    </Box>
  )
}

interface CardAttachmentTileProps {
  type: AttachmentType
  attachment: _Feature_Attachment
}

function CardAttachmentTile({ type, attachment }: CardAttachmentTileProps) {
  const { colors } = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: '2px 0',
        marginBottom: '6px',
        bgcolor: colors.background_modal,
        color: colors.text,
        '&:hover': { bgcolor: colors.button }
      }}
      className='flex cursor-pointer flex-row items-center'
      onClick={() => {
        window.open(attachment.link, '_blank')
      }}
    >
      {/* Left box */}
      <Box sx={{ width: 112, height: 80, bgcolor: colors.button }} className='flex items-center justify-center rounded'>
        {type === 'file' ? (
          <h1 className='text-lg font-bold'>exe</h1>
        ) : (
          <FontAwesomeIcon icon={faPaperclip} style={{ width: 36, marginRight: '6px' }} className='text-xl' />
        )}
      </Box>
      {/* Content */}
      <Box sx={{ flex: 1, height: 'fit-content', padding: '8px 20px' }} className='flex flex-col justify-start'>
        <Box className='flex flex-row items-center'>
          <h2 className='text-sm font-bold'>{attachment.title}</h2>
          <FontAwesomeIcon icon={faUpRightFromSquare} style={{ marginLeft: '12px' }} className='text-xs' />
        </Box>
        <Box sx={{ marginTop: '4px' }} className='flex flex-row items-center'>
          {/* Attachment creation time */}
          <p className='text-sm'>Added 5 minutes ago</p>
          {/* Divider dot */}
          <p
            className='flex items-center justify-center text-2xl font-bold'
            style={{ width: 16, position: 'relative' }}
          >
            <span style={{ position: 'absolute', left: 8, top: -8, transform: 'translate(-50%, -50%)' }}>.</span>
          </p>
          {/* Button remove */}
          <p className='text-sm underline'>Remove</p>
        </Box>
      </Box>
    </Box>
  )
}
