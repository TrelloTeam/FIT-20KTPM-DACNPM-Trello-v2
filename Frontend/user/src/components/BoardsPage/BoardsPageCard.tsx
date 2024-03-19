import { Box } from '@mui/material'
import { BoardSubset } from '~/pages'
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { useState } from 'react'

const cardBg01 =
  'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x269/46d55f978e5c638b665c3a8a56e787a3/photo-1707588883437-9b3709880e3b.jpg'

interface BoardsPageCardProps {
  currentBoard: BoardSubset
  boards: BoardSubset[]
  setBoards: (newState: BoardSubset[]) => void
}

export function BoardsPageCard({ currentBoard, boards, setBoards }: BoardsPageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  function handleToggleStar() {
    const updatedBoards = boards.map((board) => {
      if (board._id === currentBoard._id) {
        return { ...board, is_star: !currentBoard.is_star }
      }
      return board
    })
    setBoards(updatedBoards)
  }

  return (
    <Box
      sx={{
        width: 194,
        height: 96,
        padding: '8px',
        backgroundImage: `url(${cardBg01})`,
        '&:hover': { filter: 'brightness(90%)' }
      }}
      className='flex cursor-pointer flex-col justify-between rounded'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ width: '100%', height: 20 }} className='flex items-center'>
        <p style={{ fontSize: 16, fontWeight: 700 }} className='text-white'>
          {currentBoard.name}
        </p>
      </Box>
      <Box sx={{ width: '100%', height: 20 }} className='flex items-center justify-end'>
        {(isHovered || currentBoard.is_star) && (
          <Box
            sx={{ marginRight: '4px' }}
            onClick={handleToggleStar}
            color={currentBoard.is_star ? 'primary' : 'default'}
          >
            {currentBoard.is_star ? (
              <StarIcon style={{ color: '#FFD700', fontSize: 18 }} />
            ) : (
              <StarBorderOutlinedIcon style={{ color: 'white', fontSize: 18 }} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
