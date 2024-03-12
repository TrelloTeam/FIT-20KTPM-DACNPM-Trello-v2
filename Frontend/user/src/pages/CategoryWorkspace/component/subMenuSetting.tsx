import { Menu, MenuItem } from 'react-pro-sidebar'

function SubMenuSetting() {
  return (
    <Menu className='rounded-md bg-gray-200 text-sm' style={{ width: '200px', maxHeight: '200px', overflowY: 'auto' }}>
      <MenuItem>Workspace settings</MenuItem>
      <MenuItem>Upgrade workspace</MenuItem>
    </Menu>
  )
}

export default SubMenuSetting
