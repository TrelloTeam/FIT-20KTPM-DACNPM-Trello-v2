import { colors } from '../../styles/index'
import BoardsPageRow from '~/components/BoardsPage/BoardsPageRow'
import { Box, Container, Grid } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BoardsPageWorkspaceControl from '~/components/BoardsPage/BoardsPageWorkspaceControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import BoardsPageRowTemplate from '~/components/BoardsPage/BoardsPageRowTemplate'
import { selectBoardList, selectStarredBoardList } from '~/store/reducers'
import { useSelector } from 'react-redux'
import React from 'react'

export type BoardTemplate = {
  [x: string]: unknown
  _id: string
  name: string
  is_star: boolean
}

export type BoardSubset = {
  [x: string]: unknown
  _id: string
  name: string
  is_star: boolean
}

const data1: BoardTemplate[] = [
  { _id: '0', name: 'Project Management', is_star: false },
  { _id: '1', name: 'Kanban Template', is_star: false }
]

const data2: BoardSubset[] = [
  { _id: '0', name: 'Project Trello', is_star: false },
  { _id: '1', name: 'Board 2', is_star: false },
  { _id: '2', name: 'Board 3', is_star: false },
  { _id: '3', name: 'Board 4', is_star: false },
  { _id: '4', name: 'Board 5', is_star: false },
  { _id: '5', name: 'Board 6', is_star: false },
  { _id: '6', name: 'Board 7', is_star: false }
]

interface BoardsPageLabelProps {
  title: string
}

export function BoardsPageLabel({ title }: BoardsPageLabelProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export function BoardsPage() {
  const stateBoardList = useSelector(selectBoardList)
  const stateStarredBoardList = useSelector(selectStarredBoardList)

  return (
    <Box display='flex' justifyContent='center' alignItems='center' className='mb-20 mt-10'>
      <Grid container sx={{ maxWidth: 1152 }}>
        {/* (reserved) Left panel */}
        <Grid item xs={3}>
          <Container></Container>
        </Grid>
        {/* Boards Page */}
        <Grid item xs={9} sx={{ padding: '40px 16px' }}>
          {/* START: Recently Viewed Boards section */}
          <Box style={{ color: colors.primary }} sx={{ display: 'flex', alignItems: 'center' }} className='my-4'>
            <FontAwesomeIcon icon={faTrello} style={{ fontSize: 20 }} />
            <h2 style={{ fontSize: 20 }} className='ml-2 p-0 font-bold'>
              Most popular templates
            </h2>
          </Box>
          <BoardsPageRowTemplate boards={data1} />
          {/* END: Recently Viewed Boards section */}
          {/* START: Starred Boards section */}
          {stateStarredBoardList.boards.length != 0 && (
            <React.Fragment>
              {/* spacing */}
              <Container sx={{ height: 40 }}></Container>
              <Box style={{ color: colors.primary }} sx={{ display: 'flex', alignItems: 'center' }} className='my-4'>
                <StarIcon style={{ fontSize: 28 }} />
                <h1 className='ml-2 p-0 text-lg font-bold'>Starred boards</h1>
              </Box>
              <BoardsPageRow boards={stateStarredBoardList.boards} enableAddBoard={false} />
            </React.Fragment>
          )}
          {/* END: Starred Boards section */}
          {/* spacing */}
          <Container sx={{ height: 40 }}></Container>
          {/* START: Recently Viewed Boards section */}
          <Box style={{ color: colors.primary }} sx={{ display: 'flex', alignItems: 'center' }} className='my-4'>
            <AccessTimeIcon style={{ fontSize: 28 }} />
            <h1 className='ml-2 p-0 text-lg font-bold'>Recently viewed</h1>
          </Box>
          <BoardsPageRow boards={data2} enableAddBoard={false} />
          {/* END: Recently Viewed Boards section */}
          {/* spacing */}
          <Container sx={{ height: 80 }}></Container>
          {/* START: My Workspaces section */}
          <h1 style={{ color: colors.primary }} className='p-0 text-lg font-bold'>
            YOUR WORKSPACES
          </h1>
          <Grid container className='flex justify-between'>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }} className='my-2'>
                <Box
                  sx={{ width: 32, height: 32, color: 'white' }}
                  className='my-4 flex items-center justify-center rounded-md bg-gradient-to-b from-green-600 to-green-400'
                >
                  <p className='m-0 p-0 text-2xl font-bold leading-none'>Â</p>
                </Box>
                <h1 style={{ color: colors.primary }} className='ml-3 p-0 text-lg font-semibold'>
                  Âu Hồng Minh's workspace
                </h1>
              </Box>
            </Grid>
            <Grid item xs={7} className='flex items-center justify-end'>
              <BoardsPageWorkspaceControl />
            </Grid>
          </Grid>
          <BoardsPageRow boards={stateBoardList.boards} enableAddBoard={true} />
          {/* END: My Workspaces section */}
        </Grid>
      </Grid>
    </Box>
  )
}
