import { Box, FormControl, Grid, MenuItem, Popover, Select, SelectChangeEvent } from '@mui/material'
import { _Card } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { colors } from '~/styles'
import { useState } from 'react'
import { faFlipboard } from '@fortawesome/free-brands-svg-icons'

interface MoveCardModalProps {
  anchorEl: (EventTarget & HTMLDivElement) | null
  currentCard: _Card
  setCurrentCard: (newState: _Card) => void
  handleClose: () => void
}

const boardChoices: string[] = ['Project Trello', 'Front-end', 'Back-end']
const listChoices: string[] = ['To do', 'Doing', 'Done', 'Week 1', 'Week 2']
const positionChoices: string[] = ['1', '2', '3', '4']

export function MoveCardModal({ anchorEl, currentCard, setCurrentCard, handleClose }: MoveCardModalProps) {
  const menuItemFontSize = 14
  const [selectedBoard, setSelectedBoard] = useState('Project Trello')
  const [selectedList, setSelectedList] = useState('Doing')
  const [selectedPosition, setSelectedPosition] = useState('3')

  function handleSelectBoard(event: SelectChangeEvent) {
    setSelectedBoard(event.target.value as string)
  }

  function handleSelectList(event: SelectChangeEvent) {
    setSelectedList(event.target.value as string)
  }

  function handleSelectPosition(event: SelectChangeEvent) {
    setSelectedPosition(event.target.value as string)
  }

  function handleMoveCard() {
    console.log('Card moving not implemented yet.')
  }

  return (
    <Popover
      open={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={handleClose}
    >
      <Box
        sx={{ width: 300, height: 'fit-content', margin: '0 8px', padding: '8px 0px', color: colors.primary }}
        className='flex flex-col'
      >
        {/* START: Modal heading */}
        <Grid container sx={{ width: '100%', margin: '0 0 12px 0' }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex items-center justify-center'>
            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>Move card</h2>
          </Grid>
          <Grid item xs={1} className='flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onMouseDown={handleClose} />
          </Grid>
        </Grid>
        {/* END: Modal heading */}
        {/* Select card move destination */}
        <p style={{ margin: '20px 0 16px 0', color: colors.primary }} className='text-xs font-bold'>
          Select destination
        </p>
        {/* START: Select board */}
        <Box sx={{ width: 'fit-content', height: 20, marginBottom: '4px' }} className='flex flex-row items-center'>
          <FontAwesomeIcon icon={faFlipboard} style={{ fontSize: 12 }} />
          <p style={{ marginLeft: '6px', color: colors.primary }} className='text-xs font-semibold'>
            Board
          </p>
        </Box>
        <FormControl fullWidth className='flex flex-col'>
          <Box sx={{ width: '100%', height: 'fit-content' }}>
            <Select
              sx={{ width: '100%', height: 36, margin: '0 0 8px 0', fontSize: 14 }}
              value={selectedBoard}
              onChange={handleSelectBoard}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 144,
                    marginTop: 8
                  }
                }
              }}
            >
              {boardChoices.map((choice, index) => (
                <MenuItem key={index} value={choice} sx={{ fontSize: menuItemFontSize }}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
        {/* END: Select board */}
        {/* START: Select list and position */}
        <Grid container spacing={1}>
          {/* START: Select list */}
          <Grid item xs={7}>
            <Box sx={{ width: 'fit-content', height: 20, marginBottom: '4px' }} className='flex flex-row items-center'>
              <FontAwesomeIcon icon={faList} style={{ fontSize: 12 }} />
              <p style={{ marginLeft: '6px', color: colors.primary }} className='text-xs font-semibold'>
                List
              </p>
            </Box>
            <FormControl fullWidth className='flex flex-col'>
              <Select
                sx={{ width: '100%', height: 36, margin: '0 0 8px 0', fontSize: 14 }}
                value={selectedList}
                onChange={handleSelectList}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 144,
                      marginTop: 8
                    }
                  }
                }}
              >
                {listChoices.map((choice, index) => (
                  <MenuItem key={index} value={choice} sx={{ fontSize: menuItemFontSize }}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* END: Select list */}
          {/* START: Select position */}
          <Grid item xs={5}>
            <Box sx={{ width: 'fit-content', height: 20, marginBottom: '4px' }} className='flex flex-row items-center'>
              <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 12 }} />
              <p style={{ marginLeft: '6px', color: colors.primary }} className='text-xs font-semibold'>
                Position
              </p>
            </Box>
            <FormControl fullWidth className='flex flex-col'>
              <Select
                sx={{ height: 36, margin: '0 0 8px 0', fontSize: 14 }}
                value={selectedPosition}
                onChange={handleSelectPosition}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 144,
                      marginTop: 8
                    }
                  }
                }}
              >
                {positionChoices.map((choice, index) => (
                  <MenuItem key={index} value={choice} sx={{ fontSize: menuItemFontSize }}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* END: Select position */}
        </Grid>
        {/* END: Select list and position */}
        {/* Button */}
        <Box
          sx={{
            bgcolor: '#0c66e4',
            width: 'fit-content',
            height: 32,
            margin: '10px 0 10px 0',
            padding: '0 20px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(90%)'
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={() => {
            handleMoveCard()
            handleClose()
          }}
        >
          <p>Move</p>
        </Box>
      </Box>
    </Popover>
  )
}
