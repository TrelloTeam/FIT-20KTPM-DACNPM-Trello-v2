import * as React from 'react'
import { Box, ClickAwayListener, Grow, Paper, Popper, MenuList, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Account() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Stack direction='row' spacing={2}>
      <Box>
        <Box
          ref={anchorRef}
          id='button-workspace'
          aria-controls={open ? 'menu-workspace' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          sx={{
            borderRadius: '50%',
            padding: '5px',
            '&:hover': {
              transition: 'all 0.1s ease-in',
              backgroundColor: 'rgba(255,255,255,0.1)'
            },
            cursor: 'pointer'
          }}
        >
          <Box
            sx={{
              padding: '4px',
              fontSize: '10px',
              lineHeight: '13px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#172b4d',
              borderRadius: '50%'
            }}
          >
            HT
          </Box>
        </Box>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top'
              }}
            >
              <Paper sx={{ backgroundColor: 'transparent' }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='menu-workspace'
                    aria-labelledby='button-workspace'
                    onKeyDown={handleListKeyDown}
                    sx={{
                      marginTop: '8px',
                      transition: 'all 0.1s ease-in',
                      padding: '12px 0 6px 0',
                      backgroundColor: '#282e33',
                      minWidth: '224px',
                      borderRadius: '4px'
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                          padding: '0 20px'
                        }}
                      >
                        <Typography
                          variant='h4'
                          sx={{
                            display: 'inline-block',
                            fontSize: '14px',
                            lineHeight: '22px',
                            color: '#fff',
                            fontWeight: 700,
                            padding: '8px 10px',
                            borderRadius: '50%',
                            backgroundImage: 'linear-gradient(to bottom, #E774BB, #943D73)'
                          }}
                        >
                          HT
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant='body1' sx={{ fontSize: '14px', color: '#9fadbc', marginLeft: '12px' }}>
                            Hữu Chính Trần
                          </Typography>
                          <Typography variant='body1' sx={{ fontSize: '12px', color: '#9fadbc', marginLeft: '12px' }}>
                            abc@gmail.com
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography
                          variant='body1'
                          sx={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#9fadbc',
                            marginBottom: '4px',
                            padding: '0 20px'
                          }}
                        >
                          TRELLO
                        </Typography>
                        <Link to={'/profile/123'}>
                          <Typography
                            variant='body1'
                            sx={{
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: '#b6c2cf',
                              marginBottom: '4px',
                              padding: '10px 20px',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)'
                              }
                            }}
                          >
                            Account management
                          </Typography>
                        </Link>
                        <Link to={'/activity/123'}>
                          <Typography
                            variant='body1'
                            sx={{
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: '#b6c2cf',
                              marginBottom: '4px',
                              padding: '10px 20px',
                              '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)'
                              }
                            }}
                          >
                            Activity
                          </Typography>
                        </Link>
                        <Typography
                          variant='body1'
                          sx={{
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#b6c2cf',
                            marginBottom: '4px',
                            padding: '10px 20px',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            },
                            borderBottom: '1px solid #b6c2cf'
                          }}
                        >
                          Cards
                        </Typography>

                        <Typography
                          variant='body1'
                          sx={{
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#b6c2cf',
                            padding: '10px 20px',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          Log out
                        </Typography>
                      </Box>
                    </Box>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  )
}
