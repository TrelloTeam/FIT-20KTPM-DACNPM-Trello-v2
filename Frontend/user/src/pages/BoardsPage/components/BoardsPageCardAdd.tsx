import { Box, Card, CardActions, CardActionArea } from '@mui/material'

export default function BoardsPageCardAdd() {
  return (
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
  )
}
