import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Button } from '@mui/base'
import { Divider, Drawer } from '@mui/material';

const drawerWidth = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function SidebarCateWorkSpace() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isTableHovered, setIsTableHovered] = useState(false);
    const [isCalendarHovered, setIsCalendarHovered] = useState(false);
    const [isYourBoardHovered, setIsYourBoarHovered] = useState(false);
    const [isBoardHovered, setIsBoarHovered] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleTableMouseEnter = () => {
        setIsTableHovered(true);
    };

    const handleTableMouseLeave = () => {
        setIsTableHovered(false);
    };

    const handleCalendarMouseEnter = () => {
        setIsCalendarHovered(true);
    };

    const handleCalendarMouseLeave = () => {
        setIsCalendarHovered(false);
    };

    const handleYourBoardMouseEnter = () => {
        setIsYourBoarHovered(true);
    };

    const handleYourBoardMouseLeave = () => {
        setIsYourBoarHovered(false);
    };

    const handleBoardMouseEnter = () => {
        setIsBoarHovered(true);
    };

    const handleBoardMouseLeave = () => {
        setIsBoarHovered(false);
    };

    const handleStarClick = () => {
        setIsStarred(!isStarred);
    };    

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <div className="relative">
                        <div className="rounded-full border border-gray-300 group">
                            <ChevronRightIcon className="w-6 h-6" />
                            <span className="absolute top-0 left-1/2 -mt-6 bg-blue-800 text-white px-2 py-2 text-xs whitespace-nowrap rounded opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">Expand sidebar</span>
                        </div>
                    </div>

                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
                </Toolbar>
            </AppBar>

            <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}>

                <DrawerHeader>
                    <div className='flex items-center'>
                        <span className='rounded-md bg-white font-bold'>
                            <div className='flex items-center text-sm'>
                                <WorkspacesIcon fontSize='small' className='mr-5' />
                                <div>
                                    Âu Hồng Minh's workspace
                                    <div className="text-xs font-normal">Free</div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <Sidebar className='text-sm'>
                    <Menu>
                        <MenuItem className='menu-item rounded-md'>
                            <div className='flex items-center'>
                                <SpaceDashboardOutlinedIcon fontSize='small' className='mr-2' />
                                Boards
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                    <PeopleAltOutlinedIcon fontSize='small' className='mr-2' />
                                    Members
                                </div>
                                <div>
                                    <Button>
                                        <AddOutlinedIcon className='hover:bg-gray-300 rounded-md' fontSize='small' />
                                    </Button>
                                </div>
                            </div>
                        </MenuItem>
                        <SubMenu
                            label={
                            <span className='menu-item rounded-md bg-white font-bold'>
                                <div className='flex items-center'>
                                    <SettingsIcon className='mr-2' fontSize='small' />Workspace settings
                                </div>
                            </span>
                            }>
                            <MenuItem>Workspace settings</MenuItem>
                            <MenuItem>Upgrade workspace</MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>

                <h1 className='mb-2 pl-5 pt-2 text-gray-700 font-bold'>Workspaces</h1>
                <Sidebar className='workspaces text-sm'>
                    <div>
                        <Menu>
                            <MenuItem className="menu-item" onMouseEnter={handleTableMouseEnter} onMouseLeave={handleTableMouseLeave}>
                                <div className="flex items-center">
                                    <TableViewIcon fontSize="small" className="mr-2" />
                                    Table
                                    {isTableHovered && (
                                        <MoreHorizIcon fontSize="small" className="hover:bg-gray-300 ml-auto" />
                                    )}
                                </div>
                            </MenuItem>

                            <MenuItem className="menu-item" onMouseEnter={handleCalendarMouseEnter} onMouseLeave={handleCalendarMouseLeave}>
                                <div className="flex items-center">
                                    <CalendarMonthIcon fontSize="small" className="mr-2" />
                                        Calendar
                                    {isCalendarHovered && (
                                        <MoreHorizIcon fontSize="small" className="hover:bg-gray-300 ml-auto" />
                                    )}
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </Sidebar>

                <div className='flex w-full items-center justify-between' onMouseEnter={handleYourBoardMouseEnter} onMouseLeave={handleYourBoardMouseLeave}>
                    <h1 className='mb-2 pl-5 text-gray-700 font-bold flex items-center'>Your boards</h1>
                    {isYourBoardHovered && (
                        <MoreHorizIcon fontSize="small" className="ml-auto hover:bg-gray-300" />
                    )}
                    <div>
                        <Button>
                            <AddOutlinedIcon className='hover:bg-gray-300 rounded-md' fontSize='small' />
                        </Button>
                    </div>
                </div>

                <Sidebar className='workspaces mb-10 text-sm'>
                    <div>
                        <Menu>
                            <MenuItem className="menu-item" onMouseEnter={handleBoardMouseEnter} onMouseLeave={handleBoardMouseLeave}>
                                <div className="flex items-center">
                                    <WorkspacesIcon fontSize="small" className="mr-2" />
                                        Project
                                        {isBoardHovered && (
                                            <>
                                                <MoreHorizIcon fontSize="small" className="ml-auto hover:bg-gray-300" />
                                                {isStarred ? (
                                                    <StarIcon
                                                        fontSize="small"
                                                        className="ml-2 hover:bg-gray-300"
                                                        onClick={handleStarClick}
                                                    />
                                                ) : (
                                                    <StarBorderIcon
                                                        fontSize="small"
                                                        className="ml-2 hover:bg-gray-300"
                                                        onClick={handleStarClick}
                                                    />
                                                )}
                                            </>
                                        )
                                    }
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </Sidebar>
            </Drawer>
        </Box>
  );
}

export default SidebarCateWorkSpace