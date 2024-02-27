import { Box, Card, CardActions, CardActionArea, Popover } from '@mui/material'
import CreateBoardDialog from './BoardsPage/CreateBoardDialog'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, openDialog, selectCreateBoardDialog } from '~/store/reducers'
import React from 'react'

export default function BoardsPageCardAdd() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const dispatch = useDispatch()

  const stateCreateBoardDialog = useSelector(selectCreateBoardDialog)

  function handleOpenDialog(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
    dispatch(openDialog())
  }

  function handleCloseDialog() {
    dispatch(closeDialog())
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Card sx={{ width: 200, height: 100, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <CardActionArea
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
          }}
          onClick={handleOpenDialog}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <p className='text-sm font-semibold'>Create new board</p>
          </Box>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
      {stateCreateBoardDialog.isOpen && (
        <Popover
          open={stateCreateBoardDialog.isOpen}
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
          <CreateBoardDialog />
        </Popover>
      )}
    </React.Fragment>
  )
}
