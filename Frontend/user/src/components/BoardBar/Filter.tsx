import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelectMembers from './SelectMembers'
import { useTheme } from '../Theme/themeContext'

export default function Filter() {
  const { darkMode, colors } = useTheme()
  return (
    <Box
      sx={{
        color: '#44546F',
        width: '384px',
        bgcolor: colors.backgroundSecond,
        color: colors.text,
        padding: '0'
      }}
    >
      <Box>
        <h3 className='flex justify-center'>Filter</h3>
      </Box>
      <Box>
        <Card
          sx={{
            width: '100%',
            bgcolor: colors.backgroundSecond,
            color: colors.text,
            border: 'none',
            boxShadow: 'none',
            marginTop: '10px',
            maxHeight: '75vh',
            overflowY: 'auto'
          }}
        >
          <Box>
            <Stack direction='row' alignItems='center'>
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                Keyword
              </Typography>
            </Stack>
            <FormControl sx={{ width: '98%' }}>
              <input
                type='text'
                className={` rounded-[3px] border-[3px] border-[#8590A2] p-2 transition-all duration-100 active:scale-[0.98]`}
                placeholder='Enter key word...'
                style={{ backgroundColor: colors.backgroundSecond }}
              />
              <FormHelperText id='my-helper-text' sx={{ color: colors.text }}>
                Search cards, members, labels, and more.
              </FormHelperText>
            </FormControl>
          </Box>

          <Box className='mt-3'>
            <Stack direction='row' alignItems='center'>
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                Due date
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <Stack direction='row' alignItems='center'>
                <FormControlLabel
                  value='end'
                  control={<Checkbox sx={{ color: colors.text }} />}
                  label=''
                  labelPlacement='end'
                />
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
                <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                  No members
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center'>
                <FormControlLabel
                  value='end'
                  control={<Checkbox sx={{ color: colors.text }} />}
                  label=''
                  labelPlacement='end'
                />
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
                <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                  Card assigned to me
                </Typography>
              </Stack>
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='Select members'
                labelPlacement='end'
              />
            </Box>
          </Box>

          <Box className='mt-3'>
            <Stack direction='row' alignItems='center'>
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                Due date
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='No members'
                labelPlacement='end'
              />
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='Cards assigned to me'
                labelPlacement='end'
              />
              <Stack direction='row' alignItems='center'>
                <FormControlLabel
                  sx={{ marginRight: '0' }}
                  value='end'
                  control={<Checkbox sx={{ color: colors.text }} />}
                  label=''
                  labelPlacement='end'
                />
                <SelectMembers />
              </Stack>
            </Box>
          </Box>

          <Box className='mt-3'>
            <Stack direction='row' alignItems='center'>
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                Due date
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='No members'
                labelPlacement='end'
              />
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='Cards assigned to me'
                labelPlacement='end'
              />
              <FormControlLabel
                value='end'
                sx={{ bgcolor: colors.backgroundSecond, color: colors.text }}
                control={<Checkbox sx={{ color: colors.text }} />}
                label='Select members'
                labelPlacement='end'
              />
            </Box>
          </Box>

          <Box className='mt-3'>
            <Stack direction='row' alignItems='center'>
              <Typography component='div' sx={{ fontWeight: '400', fontSize: '14px', color: colors.text }}>
                Due date
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='End'
                labelPlacement='end'
              />
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='End'
                labelPlacement='end'
              />
              <FormControlLabel
                value='end'
                control={<Checkbox sx={{ color: colors.text }} />}
                label='End'
                labelPlacement='end'
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ marginRight: '230px' }} />}
                  aria-controls='panel1-content'
                  id='panel1-header'
                >
                  <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                    blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
