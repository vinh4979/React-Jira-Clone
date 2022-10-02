import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { LogoutOutlined, ModeNight } from '@mui/icons-material'
import { Switch } from '@mui/material'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { SET_MODE, SIGNOUT } from 'src/redux/type/type'
import { TOKEN } from 'src/config/configApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import MainTask from './MainTask'

const drawerWidth = 240

const MainBox = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function Main() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

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

  const handleDragEnd = () => {
    // here
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Jira Clone
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
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
          {/* <DragDropContext onDragEnd={handleDragEnd}>
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
          </DragDropContext> */}
        </List>
      </Drawer>
      <MainBox open={open}>
        <DrawerHeader />
        {/* // here */}
        <MainTask />
      </MainBox>
    </Box>
  )
}
