import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import '../../../styles/templates.css';

function SidebarTemplate() {
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
                    <MenuItem className='menu-item' style={{marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <HomeOutlinedIcon fontSize='small' style={{ marginRight: '10px' }} />
                            Home
                        </div>
                    </MenuItem>
                </Menu>
        </Sidebar>
        </div>
        
    );
}

export default SidebarTemplate;
