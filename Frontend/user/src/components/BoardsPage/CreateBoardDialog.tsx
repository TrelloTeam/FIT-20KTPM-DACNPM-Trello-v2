import { faCheck, faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard, closeDialog } from '~/store/reducers'
import bgHeader from '~/assets/bg_header_create_board.svg'
import React from 'react'
import { colors } from '~/styles'
import { BoardSubset } from '~/pages'

const workspaceOptions = ["Âu Hồng Minh's workspace", 'My Workspace']
const visibilityOptions = ['Private', 'Workspace', 'Public']

export default function CreateBoardDialog() {
  const dispatch = useDispatch()
  const [textFieldValue, setTextFieldValue] = useState('')
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  function handleSubmit() {
    if (textFieldValue.trim() === '') return
    const newBoard: BoardSubset = {
      _id: '1',
      name: textFieldValue,
      is_star: false
    }
    dispatch(addBoard(newBoard))
    dispatch(closeDialog())
    setTextFieldValue('')
  }

  function handleClose() {
    dispatch(closeDialog())
    setTextFieldValue('')
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setTextFieldValue(value)
  }

  return (
    <Box
      sx={{ width: 300, height: 'fit-content', padding: '12px 12px', backgroundColor: 'white' }}
      boxShadow={3}
      borderRadius={2}
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
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ width: '14px', height: '14px' }} />
        </Box>
        {/* Title */}
        <p style={{ fontSize: '14px', fontWeight: 500 }}>Create board</p>
        {/* Button close */}
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
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faClose} style={{ width: '14px', height: '14px' }} />
        </Box>
      </Box>
      {/* END: Header */}
      {/* START: Body */}
      <Box sx={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 180px)' }}>
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
          <p style={{ fontSize: '12px', fontWeight: 700, color: colors.secondary, marginBottom: '4px' }}>
            Board title <span style={{ color: 'red' }}>*</span>
          </p>
          <input
            onChange={handleChangeTitle}
            type='text'
            style={{
              width: '100%',
              padding: '4px 8px',
              fontSize: '14px',
              color: colors.secondary,
              backgroundColor: 'fff',
              border: '1px solid #9fadbc',
              borderRadius: '4px',
              marginBottom: '4px'
            }}
          />
          {/* Alert */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span role='img' aria-label='wave'>
              👋
            </span>
            <p style={{ fontSize: '14px', color: colors.secondary, marginLeft: '6px' }}>Board title is required</p>
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
                color: colors.secondary
              },
              '& .MuiSvgIcon-root': {
                color: colors.secondary
              },
              border: '1px solid #9fadbc',
              borderRadius: '4px'
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        {/* Select visibility */}
        <Box sx={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: colors.secondary, marginBottom: '4px' }}>Visibility</p>
          <Autocomplete
            size='small'
            disableClearable
            id='controllable-states-demo'
            options={visibilityOptions}
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: '12px',
                color: colors.secondary
              },
              '& .MuiSvgIcon-root': {
                color: colors.secondary
              },
              border: '1px solid #9fadbc',
              borderRadius: '4px'
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        {/* Button submit */}
        <Button
          ref={anchorRef}
          id='composition-button'
          aria-haspopup='true'
          sx={{
            width: '100%',
            fontSize: '13px',
            textTransform: 'none',
            color: '#fff',
            backgroundColor: 'rgb(12, 102, 228)',
            '&:hover': {
              backgroundColor: 'rgb(9, 70, 190)'
            },
            transition: 'all 0.1s ease-in',
            lineHeight: '20px'
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Box>
      {/* END: Body */}
    </Box>
  )
}
