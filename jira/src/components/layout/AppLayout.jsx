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
import {
  Add,
  BookmarkAddedTwoTone,
  LogoutOutlined,
  ModeNight
} from '@mui/icons-material'
import { Switch } from '@mui/material'
import { LOADING, SET_MODE, SIGNOUT } from 'src/redux/type/type'
import { TOKEN } from 'src/config/configApi'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import authUtils from 'src/utils/auth'
import Loading from '../common/Loading'

import AssignUserModal from '../common/modal.component/AssignUserModal'
import NotiSnack from '../common/Notification.component/NotiSnack'
import ModalCreateTask from '../common/modal.component/ModalCreateTask'
import ModalEditTask from '../common/modal.component/ModalEditTask'
import ModalTaskDetail from '../common/modal.component/ModalTaskDetail'

const drawerWidth = 240

const MainBox = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    height: '100vh',
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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const AppLayout = () => {
  const { isLoading } = useSelector(state => state.stateReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    const checkAuth = async () => {
      dispatch({
        type: LOADING,
        payLoad: true
      })
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate('/login')
      } else {
        dispatch({
          type: LOADING,
          payLoad: false
        })
      }
    }
    checkAuth()
  }, [navigate, dispatch])

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const { modeSystem } = useSelector(state => state.stateReducer)
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

  return isLoading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        overflow: 'auto'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <AssignUserModal />
        <ModalEditTask />
        <NotiSnack />
        <ModalCreateTask />
        {/* <ModalTaskDetail /> */}
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
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  width: '100%'
                }}
                onClick={() => navigate('/')}
              >
                <BookmarkAddedTwoTone />
                <Typography ml={3}>My Project</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  width: '100%'
                }}
                onClick={() => navigate('/create-project')}
              >
                <Add />
                <Typography ml={3}>Create project</Typography>
              </ListItemButton>
            </ListItem>

            <Divider />
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
          </List>
        </Drawer>
        <MainBox open={open}>
          <DrawerHeader />
          {/* // here */}
          <Outlet />
        </MainBox>
      </Box>
    </Box>
  )
}

export default AppLayout
