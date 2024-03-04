import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { colors, colorsButton } from '~/styles'

const getContrastColor = (hexColor: string) => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white based on luminance
  return luminance > 0.5 ? '#533f04' : '#ffffff'
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

function ButtonAddLabel() {
  return (
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
    >
      <FontAwesomeIcon icon={faPlus} />
    </Box>
  )
}

export default function CardLabelList() {
  return (
    <Box sx={{ margin: '10px 20px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Labels
      </h2>
      <div className='flex flex-row flex-wrap'>
        <CardLabelItem title='Đã hoàn thành' bgColor='#00fa9a' />
        <CardLabelItem title='Sắp hoàn thành' bgColor='#ffd700' />
        <CardLabelItem title='Gấp' bgColor='#ffa500' />
        <CardLabelItem title='Không kịp tiến độ' bgColor='#ff0000' />
        <ButtonAddLabel />
      </div>
    </Box>
  )
}
