import { Grid } from '@mui/material'

import { BoardSubset } from '~/pages'
import { WorkspaceBoardsPageCard } from './WorkspaceBoardsPageCard'
import { WorkspaceBoardsPageCardAdd } from './WorkspaceBoardsPageCardAdd'

interface BoardsPageRowProps {
  boards: BoardSubset[]
  setBoards: (newState: BoardSubset[]) => void
  enableAddBoard: boolean
}

export default function BoardsPageRow({ boards, setBoards, enableAddBoard }: BoardsPageRowProps) {
  return (
    <Grid container spacing={3}>
      {enableAddBoard ? (
        <Grid item xs={3}>
          <WorkspaceBoardsPageCardAdd />
        </Grid>
      ) : null}
      {boards.map((board: BoardSubset, index: number) => (
        <Grid item xs={3} key={index} className='flex items-center justify-center'>
          <WorkspaceBoardsPageCard currentBoard={board} boards={boards} setBoards={setBoards} />
        </Grid>
      ))}
    </Grid>
  )
}
