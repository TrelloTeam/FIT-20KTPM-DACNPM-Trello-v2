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
import { Box } from '@mui/material'
import { colors, colorsButton } from '~/styles'

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonType {
  Members = 'Members',
  Labels = 'Labels',
  Checklists = 'Checklists',
  Dates = 'Dates',
  Attachments = 'Attachments',
  CustomFields = 'Custom Fields',
  Move = 'Move',
  Copy = 'Copy',
  Archive = 'Archive'
}

// eslint-disable-next-line react-refresh/only-export-components
export const buttonTypeIconMap: Record<ButtonType, IconProp> = {
  Members: faUser,
  Labels: faTag,
  Checklists: faSquareCheck,
  Dates: faClock,
  Attachments: faPaperclip,
  'Custom Fields': faGripLines,
  Move: faArrowRight,
  Copy: faCopy,
  Archive: faBoxArchive
}

interface SidebarButtonProps {
  icon: IconProp
  title: string
  onClick: () => void
}

export function SidebarButton({ icon, title, onClick }: SidebarButtonProps) {
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
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} style={{ width: 12 }} />
      <p className='text-sm font-semibold'>{title}</p>
    </Box>
  )
}
