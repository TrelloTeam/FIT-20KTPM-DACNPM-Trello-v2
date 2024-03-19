import { faCheck, faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, Box, Button, Popover, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '~/store/reducers'
import bgHeader from '~/assets/bg_header_create_board.svg'
import React from 'react'
import { colors } from '~/styles'
import { BoardSubset } from '~/pages'
import { useTheme } from '../Theme/themeContext'

const workspaceOptions = ["Âu Hồng Minh's workspace", 'My Workspace']
const visibilityOptions = ['Private', 'Workspace', 'Public']

interface CreateBoardModalProps {
  anchorEl: HTMLDivElement | null
  isOpen: boolean
  handleCloseDialog: () => void
}

export default function CreateBoardModal({ anchorEl, isOpen, handleCloseDialog }: CreateBoardModalProps) {
  const { colors } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const dispatch = useDispatch()
  const [textFieldValue, setTextFieldValue] = useState('')
  const [isRequired, setIsRequired] = useState(true)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  function handleSubmit() {
    if (textFieldValue.trim() === '') return
    const newBoard: BoardSubset = {
      _id: '1',
      name: textFieldValue,
      is_star: false
    }
    dispatch(addBoard(newBoard))
    handleCloseDialog()
    setTextFieldValue('')
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    value.trim() === '' ? setIsRequired(true) : setIsRequired(false)
    setTextFieldValue(value)
  }

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleCloseDialog}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: -10
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 'fit-content',
          padding: '12px 12px',
          backgroundColor: colors.background_modal_secondary,
          color: colors.text
        }}
        boxShadow={3}
      >
        {/* START: Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: colors.secondary
          }}
        >
          {/* Button back */}
          <Box
            sx={{
              lineHeight: '8px',
              padding: '8px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px'
              }
            }}
          ></Box>
          {/* Title */}
          <p style={{ fontSize: '14px', fontWeight: 500 }}>Create board</p>
          {/* Button close */}
          <Box
            sx={{
              lineHeight: '8px',
              padding: '8px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: colors.button,
                borderRadius: '4px'
              }
            }}
            onClick={handleCloseDialog}
          >
            <FontAwesomeIcon icon={faClose} style={{ width: '14px', height: '14px' }} />
          </Box>
        </Box>
        {/* END: Header */}
        {/* START: Body */}
        <Box sx={{ height: 'fit-content' }}>
          {/* Board preview */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '12px auto',
              backgroundImage:
                'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/69360d5ef9e7535cda824ab868bb1628/photo-1708058885492-09ef26cd4af8.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '200px',
              height: '120px',
              borderRadius: '4px'
            }}
          >
            <img src={bgHeader} alt='' />
          </Box>
          {/* Select board background */}
          <p style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: colors.secondary }}>Background</p>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                  'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/69360d5ef9e7535cda824ab868bb1628/photo-1708058885492-09ef26cd4af8.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '25%',
                height: '40px',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                '&:hover::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <FontAwesomeIcon icon={faCheck} style={{ fontSize: '12px' }} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                  'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/69360d5ef9e7535cda824ab868bb1628/photo-1708058885492-09ef26cd4af8.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '25%',
                height: '40px',
                borderRadius: '4px'
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                  'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/69360d5ef9e7535cda824ab868bb1628/photo-1708058885492-09ef26cd4af8.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '25%',
                height: '40px',
                borderRadius: '4px'
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                  'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/69360d5ef9e7535cda824ab868bb1628/photo-1708058885492-09ef26cd4af8.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '25%',
                height: '40px',
                borderRadius: '4px'
              }}
            ></Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', marginBottom: '12px' }}>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage: 'linear-gradient(to bottom right, #E774BB, #943D73)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            ></Box>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage:
                  'linear-gradient(to right bottom, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))'
              }}
            ></Box>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage:
                  'linear-gradient(to right bottom, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))'
              }}
            ></Box>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage:
                  'linear-gradient(to right bottom, rgb(254, 240, 138), rgb(187, 247, 208), rgb(34, 197, 94))'
              }}
            ></Box>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage: 'linear-gradient(to right bottom, rgb(165, 180, 252), rgb(192, 132, 252))'
              }}
            ></Box>
            <Box
              sx={{
                width: '16.67%',
                height: '32px',
                borderRadius: '4px',
                backgroundImage: 'linear-gradient(to right bottom, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))'
              }}
            ></Box>
          </Box>
          {/* Input board title */}
          <Box sx={{ marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>
              Board title <span style={{ color: 'red' }}>*</span>
            </p>
            <input
              ref={inputRef}
              autoFocus={true}
              onChange={handleChangeTitle}
              type='text'
              style={{
                width: '100%',
                padding: '4px 8px',
                fontSize: '14px',
                color: colors.text,
                background: colors.background_modal_tertiary,
                border: `1px solid ${isRequired ? 'red' : colors.text}`,
                borderRadius: '4px',
                marginBottom: '4px'
              }}
            />
            {/* Alert */}
            <Box sx={{ display: 'flex', alignItems: 'center', visibility: isRequired ? 'visible' : 'hidden' }}>
              <span role='img' aria-label='wave'>
                👋
              </span>
              <p
                style={{
                  fontSize: '14px',
                  color: colors.secondary,
                  marginLeft: '6px'
                }}
              >
                Board title is required
              </p>
            </Box>
          </Box>
          {/* Select workspace */}
          <Box sx={{ marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: colors.secondary, marginBottom: '4px' }}>Workspace</p>
            <Autocomplete
              size='small'
              disableClearable
              id='controllable-states-demo'
              options={workspaceOptions}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  fontSize: '12px',
                  color: colors.text
                },
                '& .MuiSvgIcon-root': {
                  color: colors.text
                },
                border: `1px solid ${colors.text}`,
                borderRadius: '4px'
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          {/* Select visibility */}
          <Box sx={{ marginBottom: '18px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: colors.secondary, marginBottom: '4px' }}>
              Visibility
            </p>
            <Autocomplete
              size='small'
              disableClearable
              id='controllable-states-demo'
              options={visibilityOptions}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  fontSize: '12px',
                  color: colors.text,
                  backgroundColor: colors.background_modal_tertiary
                },
                '& .MuiSvgIcon-root': {
                  color: colors.text,
                  backgroundColor: colors.background_modal_tertiary
                },
                '& .MuiOutlinedInput-root': {
                  background: colors.background_modal_tertiary
                },
                border: `1px solid ${colors.text}`,
                borderRadius: '4px'
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          {/* Button submit */}
          <Box
            ref={anchorRef}
            id='composition-button'
            aria-haspopup='true'
            sx={{
              width: '100%',
              height: 32,
              padding: '6px',
              fontSize: '14px',
              color: colors.button_primary_text,
              backgroundColor: colors.button_primary,
              '&:hover': {
                filter: 'brightness(90%)'
              }
            }}
            className='flex items-center justify-center'
            onClick={handleSubmit}
          >
            <p className='font-semibold'>Create</p>
          </Box>
        </Box>
        {/* END: Body */}
      </Box>
    </Popover>
  )
}
