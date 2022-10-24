import * as React from 'react'
import { List, ListItem } from '@mui/material'
import Popover from '@mui/material/Popover'

export default function CustomPopover(props) {
  const { row, id } = props
  const [anchorEl, setAnchorEl] = React.useState(null)

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
        ...
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
        <List sx={{ pt: 0 }}>
          {row.members?.map(memberimg => {
            return (
              <ListItem>
                <img
                  className="rounded-full w-8 h-8 inline-block"
                  src={memberimg.avatar}
                />
                <p className="ml-3"> {memberimg.name}</p>
              </ListItem>
            )
          })}
        </List>
      </Popover>
    </span>
  )
}

