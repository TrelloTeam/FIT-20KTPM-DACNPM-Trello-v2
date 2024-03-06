import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faSquareCheck,
  faTag,
  faUser,
  faClock,
  faPaperclip,
  faGripLines,
  faArrowRight,
  faCopy,
  faBoxArchive
} from '@fortawesome/free-solid-svg-icons'
import { Box, Stack } from '@mui/material'
import { colors, colorsButton } from '~/styles'

interface SidebarButtonProps {
  icon: IconProp
  title: string
}

function SidebarButton({ icon, title }: SidebarButtonProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 32,
        padding: '0px 12px 0 12px',
        color: colors.primary,
        bgcolor: colorsButton.secondary,
        '&:hover': {
          bgcolor: colorsButton.secondary_hover
        }
      }}
      className='mb-2 flex cursor-pointer flex-row items-center justify-start gap-2 rounded'
    >
      <FontAwesomeIcon icon={icon} style={{ width: 12 }} />
      <p className='text-sm font-semibold'>{title}</p>
    </Box>
  )
}

export default function CardSidebar() {
  return (
    <Stack sx={{ padding: '10px 0 0 0' }}>
      <h2 style={{ color: colors.primary }} className='mb-2 text-xs font-bold'>
        Add to card
      </h2>
      <SidebarButton icon={faUser} title='Members' />
      <SidebarButton icon={faTag} title='Labels' />
      <SidebarButton icon={faSquareCheck} title='Checklist' />
      <SidebarButton icon={faClock} title='Dates' />
      <SidebarButton icon={faPaperclip} title='Attachment' />
      <SidebarButton icon={faGripLines} title='Custom Fields' />
      <h2 style={{ color: colors.primary }} className='mb-2 mt-6 text-xs font-bold'>
        Actions
      </h2>
      <SidebarButton icon={faArrowRight} title='Move' />
      <SidebarButton icon={faCopy} title='Copy' />
      <SidebarButton icon={faBoxArchive} title='Archive' />
    </Stack>
  )
}
