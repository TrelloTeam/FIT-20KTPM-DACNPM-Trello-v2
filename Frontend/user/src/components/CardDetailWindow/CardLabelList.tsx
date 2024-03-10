import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { colors, colorsButton } from '~/styles'
import { _Card } from '.'
import { useState } from 'react'
import { CardLabelModal } from './CardModals'

// eslint-disable-next-line react-refresh/only-export-components
export const labelColors: string[] = [
  '#BAF3DB', //  0 - subtle green
  '#F8E6A0', //  1 - subtle yellow
  '#FEDEC8', //  2 - subtle orange
  '#FFD5D2', //  3 - subtle red
  '#DFD8FD', //  4 - subtle purple
  '#4BCE97', //  5 - green
  '#F5CD47', //  6 - yellow
  '#FEA362', //  7 - orange
  '#F87168', //  8 - red
  '#9F8FEF', //  9 - purple
  '#1F845A', // 10 - bold green
  '#946F00', // 11 - bold yellow
  '#C25100', // 12 - bold orange
  '#C9372C', // 13 - bold red
  '#CE5DC6', // 14 - bold purple
  '#CCE0FF', // 15 - subtle blue
  '#C6EDFB', // 16 - subtle sky
  '#D3F1A7', // 17 - subtle lime
  '#FDD0EC', // 18 - subtle pink
  '#DCDFE4', // 19 - subtle black
  '#579DFF', // 20 - blue
  '#6CC3E0', // 21 - sky
  '#94C748', // 22 - lime
  '#E774BB', // 23 - pink
  '#8590A2', // 24 - black
  '#0C66E4', // 25 - bold blue
  '#227D9B', // 26 - bold sky
  '#5B7F24', // 27 - bold lime
  '#AE4787', // 28 - bold pink
  '#626F86' //  29 - bold black
]

const getContrastColor = (hexColor: string) => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white based on luminance
  return luminance > 0.588 ? '#533f04' : '#ffffff'
}

interface CardLabelItemProps {
  title: string
  bgColor: string
}

function CardLabelItem({ title, bgColor }: CardLabelItemProps) {
  const textColor = getContrastColor(bgColor)

  return (
    <Box
      sx={{
        bgcolor: bgColor,
        width: 'fit-content',
        height: 32,
        padding: '0 12px',
        color: textColor,
        '&:hover': {
          filter: 'brightness(85%)'
        }
      }}
      className='mb-1 mr-1 flex cursor-pointer items-center rounded text-sm font-semibold'
    >
      {title}
    </Box>
  )
}

interface CardLabelListProps {
  currentCard: _Card
}

export default function CardLabelList({ currentCard }: CardLabelListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null)
  const [isOpenCardLabelModal, setIsOpenCardLabelModal] = useState(false)

  function openCardLabelModal(event: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
    setIsOpenCardLabelModal(true)
  }

  function closeCardLabelModal() {
    setIsOpenCardLabelModal(false)
  }

  return (
    <Box sx={{ margin: '10px 20px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Labels
      </h2>
      <div className='flex flex-row flex-wrap'>
        {currentCard.labels.map((label) => (
          <CardLabelItem key={label._id} title={label.name} bgColor={labelColors[parseInt(label._id, 10)]} />
        ))}
        {/* <CardLabelItem title='Đã hoàn thành' bgColor='#00fa9a' />
        <CardLabelItem title='Sắp hoàn thành' bgColor='#ffd700' />
        <CardLabelItem title='Gấp' bgColor='#ffa500' />
        <CardLabelItem title='Không kịp tiến độ' bgColor='#ff0000' /> */}
        {/* Button add label */}
        <Box
          sx={{
            bgcolor: colorsButton.secondary,
            width: 32,
            height: 32,
            color: colors.primary,
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              bgcolor: colorsButton.secondary_hover
            }
          }}
          className='flex cursor-pointer items-center justify-center rounded'
          onClick={(e) => openCardLabelModal(e)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Box>
        {isOpenCardLabelModal && <CardLabelModal anchorEl={anchorEl} handleClose={closeCardLabelModal} />}
      </div>
    </Box>
  )
}
