import { Grid } from '@mui/material'

import { BoardTemplate } from '~/pages'
import BoardsPageCardTemplate from './BoardsPageCardTemplate'

interface BoardsPageRowTemplateProps {
  boards: BoardTemplate[]
}

export default function BoardsPageRowTemplate({ boards }: BoardsPageRowTemplateProps) {
  return (
    <Grid container spacing={2}>
      {boards.map((board: BoardTemplate, index: number) => (
        <Grid item xs={3} key={index}>
          <BoardsPageCardTemplate board={board} />
        </Grid>
      ))}
    </Grid>
  )
}
