import { LogoutOutlined, ModeNight } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { TOKEN } from 'src/config/configApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_MODE, SIGNOUT } from 'src/redux/type/type'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const itemData = [
    {
      id: 0,
      title: 'Breakfast',
      author: '@bkristastucchio'
    },
    {
      id: 1,
      title: 'Burger',
      author: '@rollelflex_graphy726'
    },
    {
      id: 2,
      title: 'Camera',
      author: '@helloimnik'
    },
    {
      id: 3,
      title: 'Coffee',
      author: '@nolanissac'
    },
    {
      id: 4,
      title: 'Hats',
      author: '@hjrc33'
    }
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { modeSystem } = useSelector(state => state.stateReducer)
  console.log('mode:', modeSystem)
  const sidebarWidth = 250

  // func logout
  const logout = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem('USER_ACCOUNT')
    dispatch({
      type: SIGNOUT
    })
    navigate('/login')
  }

  // func set dark or light mode system
  const handleMode = state => {
    dispatch({
      type: SET_MODE,
      payLoad: state
    })
  }
  const [open, setOpen] = useState(false)

  const handleDragEnd = () => {
    // here
  }
  return (
    <Drawer
      // container={window.document.body}
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: sidebarWidth
        // height: '100%',
      }}
    >
      <Paper>
        <List
          sx={{
            width: sidebarWidth,
            height: '100vh'
            // height: '100vh',
            // backgroundColor: 'gray'
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                width: ' 100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
              }}
              onClick={logout}
            >
              <Box>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
              </Box>
              <Box>
                <ListItemText primary="Logout" />
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                width: ' 100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
              }}
              component="a"
              href="#simple-list"
            >
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                checked={modeSystem}
                onChange={() => handleMode(!modeSystem)}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              key={'list-board-droppable'}
              droppableId={'list-board-droppable'}
            >
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {itemData.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItemButton
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              pl: '20px',
                              cursor: snapshot.isDragging
                                ? 'grab'
                                : 'pointer !important'
                            }}
                          >
                            <Typography>{item.title}</Typography>
                          </ListItemButton>
                        )}
                      </Draggable>
                    )
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </List>
      </Paper>
    </Drawer>
  )
}

export default Sidebar
