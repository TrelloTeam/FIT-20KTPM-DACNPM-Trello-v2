import { Box } from '@mui/material'
import { BoardTemplate } from '~/pages'
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { useState } from 'react'
import { useTheme } from '../Theme/themeContext'

const cardBg01 =
  'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg'

interface BoardsPageCardTemplateProps {
  board: BoardTemplate
}

export function BoardsPageCardTemplate({ board }: BoardsPageCardTemplateProps) {
  const { colors } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [isStar, setIsStar] = useState(false)

  const handleToggleStar = () => {
    setIsStar((prev) => !prev)
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
      <Box sx={{ width: '100%', height: 20 }} className='flex flex-col items-start'>
        <Box
          sx={{ width: 60, height: 20, color: colors.text, backgroundColor: colors.background }}
          className='flex items-center rounded-sm p-1 text-xs font-semibold'
        >
          Template
        </Box>
        <p style={{ fontSize: 16, fontWeight: 700 }} className='text-white'>
          {board.name}
        </p>
      </Box>
      <Box sx={{ width: '100%', height: 20 }} className='flex items-center justify-end'>
        {(isHovered || isStar) && (
          <Box sx={{ marginRight: '4px' }} onClick={handleToggleStar} color={isStar ? 'primary' : 'default'}>
            {isStar ? (
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
