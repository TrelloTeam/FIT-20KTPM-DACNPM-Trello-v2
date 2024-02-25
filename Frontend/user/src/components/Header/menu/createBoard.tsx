import * as React from 'react'
import { Box, Button, Autocomplete, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import bgHeader from '~/assets/bg_header_create_board.svg'

interface AutocompleteContainerProps {
  onClose: () => void
  onBack: () => void
}

const options = ['Option 1', 'Option 2', 'Option 2']

export default function CreateBoard(props: AutocompleteContainerProps) {
  const [value, setValue] = React.useState<string | undefined>(options[0])
  const [inputValue, setInputValue] = React.useState('')
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Box sx={{ padding: '0 12px' }}>
      <Box
        onClick={props.onBack}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff'
        }}
      >
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
        <p style={{ fontSize: '14px', fontWeight: 500 }}>Create board</p>

        <Box
          onClick={props.onClose}
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
          <FontAwesomeIcon icon={faClose} style={{ width: '14px', height: '14px' }} />
        </Box>
      </Box>

      <Box sx={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 180px)' }}>
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

        <p style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: '#9fadbc' }}>Background</p>
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

        <Box sx={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#9fadbc', marginBottom: '4px' }}>
            Board title <span style={{ color: 'red' }}>*</span>
          </p>

          <input
            type='text'
            style={{
              width: '100%',
              padding: '4px 8px',
              fontSize: '14px',
              color: '#9fadbc',
              backgroundColor: '#22272b',
              border: '1px solid #e34935',
              borderRadius: '4px',
              marginBottom: '4px'
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span role='img' aria-label='wave'>
              👋
            </span>
            <p style={{ fontSize: '14px', color: '#9fadbc', marginLeft: '6px' }}>Board title is required</p>
          </Box>
        </Box>

        <Box sx={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#9fadbc', marginBottom: '4px' }}>Workspace</p>

          <Autocomplete
            size='small'
            value={value}
            disableClearable
            onChange={(event: React.SyntheticEvent, newValue: string | undefined) => {
              setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
              setInputValue(newInputValue)
            }}
            id='controllable-states-demo'
            options={options}
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: '12px',
                color: '#9fadbc'
              },
              '& .MuiSvgIcon-root': {
                color: '#9fadbc'
              },
              border: '1px solid #384148',
              borderRadius: '4px'
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        <Box sx={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#9fadbc', marginBottom: '4px' }}>Visibility</p>

          <Autocomplete
            size='small'
            value={value}
            disableClearable
            onChange={(event: React.SyntheticEvent, newValue: string | undefined) => {
              setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
              setInputValue(newInputValue)
            }}
            id='controllable-states-demo'
            options={options}
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                fontSize: '12px',
                color: '#9fadbc'
              },
              '& .MuiSvgIcon-root': {
                color: '#9fadbc'
              },
              border: '1px solid #384148',
              borderRadius: '4px'
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        <Button
          disabled
          ref={anchorRef}
          id='composition-button'
          aria-haspopup='true'
          sx={{
            width: '100%',
            fontSize: '13px',
            textTransform: 'none',
            color: '#fff',
            backgroundColor: 'rgba(86,157,255,0.1)',
            '&:hover': {
              backgroundColor: open ? 'rgba(86,157,255,0.3)' : '#85B8FF'
            },
            transition: 'all 0.1s ease-in',
            lineHeight: '20px'
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  )
}
