import { BoardSubset } from '~/pages'

import { Grid } from '@mui/material'

import { BoardsPageCard } from './BoardsPageCard'
import { BoardsPageCardAdd } from './BoardsPageCardAdd'

interface BoardsPageRowProps {
  boards: BoardSubset[]
  setBoards: (newState: BoardSubset[]) => void
  enableAddBoard: boolean
}

export default function BoardsPageRow({ boards, setBoards, enableAddBoard }: BoardsPageRowProps) {
  return (
    <Grid container spacing={2}>
      {boards.map((board: BoardSubset, index: number) => (
        <Grid item xs={3} key={index}>
          <BoardsPageCard currentBoard={board} boards={boards} setBoards={setBoards} />
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
