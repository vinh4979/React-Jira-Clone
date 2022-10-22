import {
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { USER_ACCOUNT } from 'src/config/configLocalStorage'
import {
  deleteProjectAction,
  getAllProjectAction,
  getProjectDetailAction
} from 'src/redux/action/ProjectAuthorizeAction'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { WebOutlined } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SearchIcon from '@mui/icons-material/Search'
import { ProjectCategoryAction } from 'src/redux/action/ProjectCategoryAction'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { NAVIGATE } from 'src/redux/type/type'

const MyProject = ({ theme }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { arrAllProject } = useSelector(state => state.projectReducer)
  const { projectCategory } = useSelector(state => state.projectCategoryReducer)
  const [reRender, setReRender] = useState(true)

  useEffect(() => {
    dispatch(getAllProjectAction())
    dispatch(ProjectCategoryAction())
    dispatch({
      type: NAVIGATE,
      payload: navigate
    })
  }, [dispatch, reRender])

  // filter project was created by user login
  const user = JSON.parse(localStorage.getItem(USER_ACCOUNT))

  const myProject = arrAllProject?.filter(
    project => project.creator.id === user.id
  )

  console.log('my project:', projectCategory)

  //INPUT SEARCH PROJECT + filter by category
  const [search, setSearch] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const open = Boolean(anchorEl)

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    console.log('index:', event)
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // HANDLE DELETPROJECT

  const handleDeleteProject = idProject => {
    dispatch(deleteProjectAction(idProject))
    setReRender(!reRender)
  }
  // HANLDE NAVIGATE EDIT PROJECT PAGE
  const handleNavigateEditProject = item => {
    dispatch(getProjectDetailAction(item, navigate))
  }

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          React Jira Clone
        </Link>
        <Link underline="hover" color="inherit" href="/">
          My project
        </Link>
        <Typography color="text.primary">Project board </Typography>
      </Breadcrumbs>
      <Typography my={3} variant="h5" fontWeight={500}>
        Project board
      </Typography>
      {/* input search project */}
      <Grid
        container
        spacing={3}
        sx={{
          flexGrow: 1,
          // border: '1px solid',
          mb: 3
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <TextField
            placeholder="Search project"
            size="small"
            fullWidth
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              marginRight: '10px'
            }}
          />
          {projectCategory && (
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
                    <ListItemText
                      primary={
                        projectCategory[selectedIndex - 1]?.projectCategoryName
                      }
                    />
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
                {projectCategory?.map(option => (
                  <MenuItem
                    key={option.id}
                    selected={option.id === selectedIndex}
                    onClick={event => handleMenuItemClick(event, option.id)}
                    sx={{
                      width: '160px'
                    }}
                  >
                    {option.projectCategoryName}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Grid>
        {/* selected menu */}
        <Grid
          item
          xs={4}
          // sx={{
          //   border: '1px solid red',
          //   paddingTop: '0px !important'
        ></Grid>
      </Grid>
      {/* render item project */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {myProject
            ?.filter(item => item.projectName.toLowerCase().includes(search))
            .filter(item =>
              selectedIndex !== 0 ? item.categoryId === selectedIndex : item
            )
            .map((item, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Paper
                    sx={{
                      padding: '10px',
                      borderRadius: '10px',
                      width: '100%',
                      position: 'relative',
                      zIndex: 4,
                      overflow: 'hidden'
                    }}
                  >
                    <Stack
                      direction={'row'}
                      justifyContent="space-between"
                      my={2}
                    >
                      <Stack direction={'row'} spacing={2}>
                        <WebOutlined />
                        <Typography>{item.categoryName}</Typography>
                      </Stack>
                      <Stack direction={'row'} spacing={2}>
                        <Tooltip title="Add new task" placement="top">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="primary"
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit project" placement="top">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="secondary"
                          >
                            <EditIcon
                              fontSize="small"
                              onClick={() => handleNavigateEditProject(item.id)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete project" placement="top">
                          <IconButton
                            aria-label="delete "
                            size="small"
                            color="error"
                          >
                            <DeleteOutlineIcon
                              fontSize="small"
                              onClick={() => handleDeleteProject(item.id)}
                            />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                    <Box onClick={() => navigate(`project/${item.id}`)}>
                      <Paper variant="outlined">
                        <Box
                          sx={{
                            // border: '1px solid red',
                            height: '60px',
                            overflow: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            p: 1
                          }}
                        >
                          <Typography my={1} fontSize="18px" fontWeight={500}>
                            {item.projectName}
                          </Typography>
                        </Box>
                      </Paper>
                      <InputLabel
                        sx={{
                          mt: 2,
                          mb: 1
                        }}
                      >
                        Description
                      </InputLabel>
                      <Paper variant="outlined">
                        <Box
                          sx={{
                            // border: '1px solid gray',
                            height: '200px',
                            overflow: 'auto',
                            p: 1
                          }}
                        >
                          {parse(item.description)}
                        </Box>
                      </Paper>
                    </Box>
                  </Paper>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </Box>
  )
}

export default MyProject
