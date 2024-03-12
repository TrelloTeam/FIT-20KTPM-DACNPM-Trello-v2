import { Grid } from '@mui/material'

import { BoardTemplate } from '~/pages'
import BoardsPageCardTemplate from './BoardsPageCardTemplate'
import { Link } from 'react-router-dom'

interface BoardData {
  _id: string
  name: string
  workspace_id: string
  activities: []
  members_email: []
  labels: []
  is_star: boolean
  watcher_email: string
  visibility: string
}

interface BoardsPageRowTemplateProps {
  boards: BoardData[]
}

export default function BoardsPageRowTemplate({ boards }: BoardsPageRowTemplateProps) {
  return (
    <Grid container spacing={2}>
      {boards.map((board: BoardData, index: number) => (
        <Grid item xs={3} key={index}>
          <Link to={`/board/${board._id}`}>
            <BoardsPageCardTemplate board={board} />
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}
