import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { Box, Card, CardActionArea, CardActions, CardContent, Grid, IconButton } from '@mui/material'
import { BoardTemplate } from '~/pages'
import { colors } from '~/styles'
import { useTranslation } from 'react-i18next'

const cardBg02 =
  'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg'

interface BoardsPageCardTemplateProps {
  board: BoardTemplate
}

export default function BoardsPageCardTemplate({ board }: BoardsPageCardTemplateProps) {
  const { t } = useTranslation()

  const [isStar, setIsStar] = useState(false)

  const handleToggleStar = () => {
    setIsStar((prev) => !prev)
  }

  return (
    <Card
      sx={{
        maxWidth: 200,
        maxHeight: 100,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${cardBg02})`,
        backgroundSize: 'cover',
        color: 'white'
      }}
    >
      <CardActionArea>
        {/* Board Card title */}
        <CardContent sx={{ paddingTop: 1, paddingLeft: 1 }}>
          <Box>
            <Box
              sx={{ width: 'fit-content', height: 20, color: colors.primary, backgroundColor: `rgb(240, 240, 240)` }}
              className='flex items-center rounded-sm p-1 text-xs font-semibold'
            >
              {t('Template')}
            </Box>
            <p className='font-bold'>{board.name}</p>
          </Box>
        </CardContent>
        {/* Board Card subtitle */}
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 1
          }}
        >
          <Grid container spacing={1}>
            {/* Display workspace owner */}
            <Grid item xs={10}>
              <Box></Box>
            </Grid>
            <Grid item xs={2} sx={{ paddingTop: 0, padddingRight: 1 }}>
              {/* Toggle star button */}
              <IconButton sx={{ paddingTop: 0 }} onClick={handleToggleStar} color={isStar ? 'primary' : 'default'}>
                {isStar ? (
                  <StarIcon style={{ color: 'yellow', fontSize: 18 }} />
                ) : (
                  <StarBorderOutlinedIcon style={{ color: 'white', fontSize: 18 }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  )
}
