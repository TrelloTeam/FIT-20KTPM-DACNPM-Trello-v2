import { Grid } from '@mui/material'

import { BoardSubset } from '~/pages'
import BoardsPageCard from './BoardsPageCard'
import BoardsPageCardAdd from './BoardsPageCardAdd'

interface BoardsPageRowProps {
  boards: BoardSubset[]
  enableAddBoard: boolean
}

export default function BoardsPageRow({ boards, enableAddBoard }: BoardsPageRowProps) {
  return (
    <Grid container spacing={2}>
      {boards.map((board: BoardSubset, index: number) => (
        <Grid item xs={3} key={index}>
          <BoardsPageCard board={board} />
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
