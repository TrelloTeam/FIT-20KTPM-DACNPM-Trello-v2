import { Grid } from '@mui/material'

import { BoardSubset } from '~/pages'
import BoardsPageCard from './BoardsPageCard'
import BoardsPageCardAdd from './BoardsPageCardAdd'
import { Link } from 'react-router-dom'

interface BoardsPageRowProps {
  boards: BoardSubset[]
  enableAddBoard: boolean
}

export default function BoardsPageRow({ boards, enableAddBoard }: BoardsPageRowProps) {
  return (
    <Grid container spacing={2}>
      {boards.map((board: BoardSubset, index: number) => (
        <Grid id={board._id} item xs={3} key={index}>
          <Link to={`/workspace/123`}>
            <BoardsPageCard board={board} />
          </Link>
        </Grid>
      ))}
      {enableAddBoard ? (
        <Grid item xs={3}>
          <BoardsPageCardAdd />
        </Grid>
      ) : null}
    </Grid>
  )
}
