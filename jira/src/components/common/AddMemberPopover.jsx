import React from 'react'
import { List, ListItem } from '@mui/material'
import Popover from '@mui/material/Popover'
import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
export default function AddMemberPopover(props) {
  const { row, id, user } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [member, setMember] = React.useState('')
  const memberOfRow = row?.members.map(item => item.userId)
  console.log(user)
  const handleChange = event => {
    setMember(event.target.value)
  }
  const handleClick = event => {
    console.log('handleOpen Popover')
    setAnchorEl(event.currentTarget, event.target.id)
  }
  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)
  return (
    <span>
      <button
        id={row.id}
        variant="contained"
        onClick={handleClick}
        className="rounded-full w-10 h-10 bg-neutral-600 text-black "
      >
        +
      </button>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <FormControl sx={{ width: 200 }}>
          <Select value={member} label="Member" onChange={handleChange}>
            {user?.map((item, index) => {
              if (index < 10 && !memberOfRow?.includes(item.id)) {
                return (
                  <MenuItem value={item.id}>
                    <span>{item.name}</span>{' '}
                    <button
                      variant="contained"
                      // onClick={handleClick}
                      className="rounded-full w-7 h-7 bg-neutral-600 text-black ml-3 "
                    >
                      +
                    </button>
                  </MenuItem>
                )
              }
            })}
          </Select>
        </FormControl>
      </Popover>
    </span>
  )
}
