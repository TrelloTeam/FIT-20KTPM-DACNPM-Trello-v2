import { useState } from 'react'
import { BoardSubset } from '~/pages'
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'

import { Card, CardActionArea, CardActions, CardContent, Grid, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addStarredBoard, removeStarredBoard } from '~/store/reducers/starredBoardList'

const cardBg01 =
  'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

interface BoardsPageCardProps {
  board: BoardSubset
}

export default function BoardsPageCard({ board }: BoardsPageCardProps) {
  const dispatch = useDispatch()
  const [isStar, setIsStar] = useState(false)

  const handleToggleStar = () => {
    setIsStar(!isStar)
    const updatedBoard = { ...board, is_star: isStar }
    !isStar ? dispatch(addStarredBoard(updatedBoard)) : dispatch(removeStarredBoard(board._id))
  }

  return (
    <Card
      sx={{
        maxWidth: 200,
        maxHeight: 100,
        backgroundImage: `url(${cardBg01})`,
        backgroundSize: 'cover',
        color: 'white'
      }}
    >
      <CardActionArea>
        {/* Board Card title */}
        <CardContent sx={{ paddingTop: 1, paddingLeft: 1 }}>
          <p className='font-bold'>{board.name}</p>
        </CardContent>
        {/* Board Card subtitle */}
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 3,
            paddingBottom: 0,
            paddingLeft: 1
          }}
        >
          <Grid container spacing={1}>
            {/* Display workspace owner */}
            <Grid item xs={10}>
              <p className='truncate text-sm'>Âu Hồng Minh's workspace</p>
            </Grid>
            <Grid item xs={2} sx={{ paddingTop: 0, padddingRight: 1 }}>
              {/* Toggle star button */}
              <IconButton sx={{ paddingTop: 0 }} onClick={handleToggleStar} color={isStar ? 'primary' : 'default'}>
                {isStar ? (
                  <StarIcon style={{ color: 'yellow', fontSize: 18 }} />
                ) : (
                  <StarBorderOutlinedIcon style={{ color: 'white', fontSize: 18 }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  )
}
