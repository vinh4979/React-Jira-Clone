import { List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function SelectedMenu({ option, getValue, initSelect }) {
  console.log('selectMenu - check init value:', initSelect)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState()
  useEffect(() => {
    setSelectedIndex(initSelect)
  }, [initSelect])
  const open = Boolean(anchorEl)
  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }
  // setSelectedIndex(initSelect)

  const handleMenuItemClick = (event, index) => {
    console.log('index:', event)
    setSelectedIndex(index)
    setAnchorEl(null)
    getValue(index)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          bgcolor: 'background.paper',
          width: '160px'
        }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{
            backgroundColor: theme => theme.palette.action.selected,
            height: '40px',
            borderRadius: '5px'
            // border: '1px solid red'
          }}
        >
          {selectedIndex === 0 ? (
            <ListItemText primary="All Category " />
          ) : (
            <ListItemText primary={option[selectedIndex - 1]?.taskType} />
          )}
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox'
        }}
      >
        <MenuItem
          // key={option.id}
          selected={selectedIndex === 0 ? true : false}
          onClick={event => handleMenuItemClick(event, 0)}
          sx={{
            width: '160px'
          }}
        >
          All Category
        </MenuItem>
        {option?.map(option => (
          <MenuItem
            key={option.id}
            selected={option.id === selectedIndex}
            onClick={event => handleMenuItemClick(event, option.id)}
            sx={{
              width: '160px'
            }}
          >
            {option.taskType}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
