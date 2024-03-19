import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

export default function SelectMembers() {
  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: '320px', bgcolor: '' }}>
        <InputLabel id='demo-multiple-checkbox-label' sx={{ fontSize: '14px', top: '-5px' }}>
          Select members
        </InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          size='small'
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput sx={{}} label='Select members' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem sx={{height: '36px'}} key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <Avatar
                alt={name}
                src='/static/images/avatar/1.jpg'
                sx={{ width: 24, height: 24, marginRight: 1 }}
              />
              <ListItemText  primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
