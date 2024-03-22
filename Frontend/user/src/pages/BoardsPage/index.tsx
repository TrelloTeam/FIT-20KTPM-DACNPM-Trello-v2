import React, { useState } from 'react'
import { BoardsPageCard } from '~/components/BoardsPage/BoardsPageCard'
import BoardsPageRow from '~/components/BoardsPage/BoardsPageRow'
import BoardsPageRowTemplate from '~/components/BoardsPage/BoardsPageRowTemplate'
import BoardsPageWorkspaceControl from '~/components/BoardsPage/BoardsPageWorkspaceControl'
import { useTheme } from '~/components/Theme/themeContext'

import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import { Box, Container, FormControl, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material'

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

const categories = [
  'Popular',
  'Small business',
  'Design',
  'Education',
  'Engineering-IT',
  'Marketing',
  'Human Resources',
  'Operations',
  'Sales CRM'
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
  const { colors } = useTheme()
  const [recentlyViewBoardsState, setRecentlyViewBoardsState] = useState(data2)
  const [category, setCategory] = useState('')

  function handleChange(event: SelectChangeEvent) {
    setCategory(event.target.value as string)
  }

  return (
    <Box sx={{ bgcolor: colors.background }} className='flex items-center justify-center'>
      <Grid container sx={{ maxWidth: 1152 }}>
        {/* (reserved) Left panel */}
        <Grid item xs={3}>
          <Container></Container>
        </Grid>
        {/* Boards Page */}
        <Grid item xs={9} sx={{ padding: '40px 16px' }}>
          {/* START: Board Templates section */}
          {/* Title */}
          <Box style={{ color: colors.text }} className='mb-1 mt-3 flex items-center'>
            <FontAwesomeIcon icon={faTrello} style={{ fontSize: 20 }} />
            <h2 style={{ fontSize: 20 }} className='ml-2 p-0 font-bold'>
              Most popular templates
            </h2>
          </Box>
          {/* Select category */}
          <Box style={{ color: colors.text }} className='mb-5 flex items-center'>
            <h2 style={{ fontSize: 14 }} className='font-medium'>
              Get going faster with a template from the Trello community or
            </h2>
            <FormControl sx={{ marginLeft: '6px', marginTop: '4px' }}>
              <Select
                sx={{
                  width: 240,
                  height: 36,
                  border: `1px solid ${colors.text}`,
                  background: colors.background,
                  color: colors.text,
                  '& .MuiSelect-icon': {
                    color: colors.text // Set the color of the arrow icon
                  },
                  fontSize: 14
                }}
                className='font-medium'
                value={category}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => (selected === '' ? <p>choose a category</p> : selected)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      background: colors.background,
                      color: colors.text,
                      fontSize: 14
                    }
                  }
                }}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category} sx={{ fontSize: 14 }}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <BoardsPageRowTemplate boards={data1} />
          <p
            style={{ color: '#579DFF', fontSize: 14, marginTop: '16px' }}
            className='cursor-pointer font-medium'
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            Browse the full template gallery
          </p>
          {/* END: Board Templates section */}
          {/* START: Starred Boards section */}
          <Box sx={{ height: 28 }}></Box>
          {recentlyViewBoardsState.filter((board) => board.is_star === true).length != 0 && (
            <React.Fragment>
              {/* Title */}
              <Box style={{ color: colors.text }} className='my-3 flex items-center'>
                <StarIcon style={{ fontSize: 24 }} />
                <h2 style={{ fontSize: 16 }} className='ml-2 p-0 text-center font-bold'>
                  Starred boards
                </h2>
              </Box>
              {/* Board list */}
              <Grid container spacing={2}>
                {recentlyViewBoardsState
                  .filter((board) => board.is_star === true)
                  .map((board: BoardSubset, index: number) => (
                    <Grid item xs={3} key={index}>
                      <BoardsPageCard
                        currentBoard={board}
                        boards={recentlyViewBoardsState}
                        setBoards={setRecentlyViewBoardsState}
                      />
                    </Grid>
                  ))}
              </Grid>
            </React.Fragment>
          )}
          {/* END: Starred Boards section */}
          <Box sx={{ height: 28 }}></Box>
          {/* START: Recently Viewed Boards section */}
          {/* Title */}
          <Box style={{ color: colors.text }} className='my-3 flex items-center'>
            <AccessTimeIcon style={{ fontSize: 24 }} />
            <h2 style={{ fontSize: 16 }} className='ml-2 p-0 text-center font-bold'>
              Recently viewed
            </h2>
          </Box>
          {/* Board list */}
          <BoardsPageRow
            boards={recentlyViewBoardsState}
            setBoards={setRecentlyViewBoardsState}
            enableAddBoard={true}
          />
          {/* START: My Workspaces section */}
          <Box sx={{ height: 70 }}></Box>
          <h1 style={{ color: colors.text }} className='p-0 text-lg font-bold'>
            YOUR WORKSPACES
          </h1>
          <Grid container className='flex justify-between'>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }} className='my-1'>
                <Box
                  sx={{ width: 32, height: 32, color: 'white' }}
                  className='my-4 flex items-center justify-center rounded-md bg-gradient-to-b from-green-600 to-green-400'
                >
                  <p className='m-0 p-0 text-2xl font-bold leading-none'>Â</p>
                </Box>
                <h1 style={{ color: colors.text }} className='ml-3 p-0 text-lg font-semibold'>
                  Âu Hồng Minh's workspace
                </h1>
              </Box>
            </Grid>
            <Grid item xs={7} className='flex items-center justify-end'>
              <BoardsPageWorkspaceControl />
            </Grid>
          </Grid>
          <BoardsPageRow
            boards={recentlyViewBoardsState}
            setBoards={setRecentlyViewBoardsState}
            enableAddBoard={true}
          />
          {/* END: My Workspaces section */}
        </Grid>
      </Grid>
    </Box>
  )
}
