import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SettingsIcon from '@mui/icons-material/Settings';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { workspaceData } from '../testData';
import { Workspace } from '../type';
import '../../../styles/templates.css';
import { Button } from '@mui/base';

function SidebarTemplate() {
    const [workspace, setWorkspace] = useState<Workspace[]>()

    useEffect(() => {
        setWorkspace(workspaceData)
    }, [])

    return (
        <div className='detail-sidebar-container'>
            <Sidebar>
                <Menu>
                    <MenuItem className='menu-item' style={{ marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SpaceDashboardOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                            Boards
                        </div>
                    </MenuItem>
                    <SubMenu  label={<span className='menu-item'>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DashboardOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                                Templates
                            </div>
                        </span>} defaultOpen={true}>
                        <MenuItem>Business</MenuItem>
                        <MenuItem>Design</MenuItem>
                        <MenuItem>Education</MenuItem>
                        <MenuItem>Engineering</MenuItem>
                        <MenuItem>Marketing</MenuItem>
                        <MenuItem>HR & Operations</MenuItem>
                        <MenuItem>Personal</MenuItem>
                        <MenuItem>Productivity</MenuItem>
                        <MenuItem>Product management</MenuItem>
                        <MenuItem>Project management</MenuItem>
                        <MenuItem>Remote work</MenuItem>
                        <MenuItem>Sales</MenuItem>
                        <MenuItem>Support</MenuItem>
                        <MenuItem>Team management</MenuItem>
                    </SubMenu>
                    <MenuItem className='menu-item home' style={{marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <HomeOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                            Home
                        </div>
                    </MenuItem>
                </Menu>
            </Sidebar>
            <h1>Workspaces</h1>
            <Sidebar className='workspaces'>
                <div>
                    
                    {workspace?.map((w, index) => (
                        <div key={index}>
                            <Menu>
                                <SubMenu label={<span className='menu-item'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <WorkspacesIcon fontSize='small' style={{ marginRight: '10px' }} />
                                            {w.name}
                                        </div>
                                    </span>}>
                                    <MenuItem>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <SpaceDashboardOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                                            Boards
                                        </div>
                                    </MenuItem>
                                    <MenuItem>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FavoriteBorderOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                                            Highlights
                                        </div>
                                    </MenuItem>
                                    <MenuItem>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <GridViewOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                                            Views
                                        </div>
                                    </MenuItem>
                                    <MenuItem>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <PeopleAltOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                                                Members
                                            </div>
                                            <div>
                                                <Button><AddOutlinedIcon fontSize='small' /></Button>
                                                
                                            </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <SettingsIcon fontSize='small' style={{ marginRight: '10px' }} />
                                            Setting
                                        </div>
                                    </MenuItem>
                                </SubMenu>
                            </Menu>
                        </div>
                    ))}
                </div>
            </Sidebar>
        </div>
    );
}

export default SidebarTemplate;
