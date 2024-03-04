import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box } from '@mui/material'
import { colors, colorsButton } from '~/styles'

const getContrastColor = (hexColor: string) => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Choose black or white based on luminance
  return luminance > 0.5 ? colors.primary : '#ffffff'
}

interface MemberAvatarProps {
  memberName: string
  bgColor: string
}

function MemberAvatar({ memberName, bgColor }: MemberAvatarProps) {
  const textColor = getContrastColor(bgColor)

  return (
    <Avatar
      sx={{
        bgcolor: bgColor,
        width: 32,
        height: 32,
        color: textColor,
        fontSize: 14,
        fontWeight: 500,
        '&:hover': {
          filter: 'brightness(85%)'
        }
      }}
      className='cursor-pointer'
    >
      {memberName}
    </Avatar>
  )
}

function AddMemberButton() {
  return (
    <Avatar
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
      className='cursor-pointer'
    >
      <FontAwesomeIcon icon={faPlus} />
    </Avatar>
  )
}

export default function CardMemberList() {
  return (
    <Box sx={{ margin: '10px 16px 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Members
      </h2>
      <div className='flex flex-row space-x-1'>
        <MemberAvatar memberName='NV' bgColor='#8a2be2' />
        <MemberAvatar memberName='AB' bgColor='#1e90ff' />
        <MemberAvatar memberName='CD' bgColor='#66cdaa' />
        <MemberAvatar memberName='MN' bgColor='#ffa500' />
        <AddMemberButton />
      </div>
    </Box>
  )
}
