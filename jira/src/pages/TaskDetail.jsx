import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskDetailAction } from '../redux/action/ProjectAuthorizeAction'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { taskTypeAction } from '../redux/action/TaskTypeAction'
import DoneIcon from '@mui/icons-material/Done'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Loading from 'src/components/common/Loading'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import 'src/assets/css/custom-editor.css'

const TaskDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getTaskDetailAction(taskId))
    dispatch(taskTypeAction())
  }, [dispatch])

  const params = useParams()
  const taskId = params.id

  const { arrTasKDetail } = useSelector(state => state.projectReducer)
  const { arrTaskType } = useSelector(state => state.taskTypeReducer)

  // menu
  const handleLoading = () => {
    const itemTaskDetail = arrTasKDetail
    const itemTaskType = arrTaskType
    if (itemTaskDetail !== null && itemTaskType !== null) {
      return false
    } else {
      return true
    }
  }

  const hanldeOnchangeTypeTask = () => {
    if (handleLoading() === false) {
      return arrTasKDetail.typeId
    }
  }
  if (hanldeOnchangeTypeTask() === undefined) {
    navigate('/')
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(hanldeOnchangeTypeTask())
  const open = Boolean(anchorEl)

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // icon task
  const IconTask = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1976d2',
        padding: '2px',
        marginRight: '10px',
        borderRadius: '5px'
      }}
    >
      <DoneIcon
        sx={{
          fontSize: '16px',
          color: 'white'
        }}
      />
    </Box>
  )

  // icon bug
  const IconBug = () => (
    <Box
      sx={{
        // border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        padding: '2px',
        marginRight: '10px',
        borderRadius: '5px'
      }}
    >
      <FiberManualRecordIcon
        sx={{
          fontSize: '16px',
          color: 'white'
        }}
      />
    </Box>
  )

  // custom input
  const RedditTextField = styled(props => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      margin: '`10px 0px',
      fontSize: '24px',
      padding: '10px 10px',
      backgroundColor: 'transparent',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      '&:hover': {
        backgroundColor: '#2b2b2b'
      },
      '&.Mui-focused': {
        backgroundColor: '#2b2b2b'
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`
      }
    }
  }))

  return (
    <>
      {!handleLoading() ? (
        <Paper>
          <Stack
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
          >
            {/* task type */}
            <Box>
              <List
                component="nav"
                aria-label="Device settings"
                sx={{
                  // bgcolor: 'background.paper',
                  width: '200px'
                }}
              >
                <ListItem
                  button
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  // aria-label="when device is locked"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}
                  sx={{
                    px: 1,
                    py: 1
                  }}
                >
                  {/* icon */}
                  {arrTaskType[selectedIndex]?.id === 1 ? (
                    <IconBug />
                  ) : (
                    <IconTask />
                  )}
                  <ListItemText
                    // primary="When device is locked"
                    secondaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                      textTransform: 'uppercase'
                    }}
                    secondary={
                      arrTaskType[selectedIndex]?.taskType + '-' + taskId
                    }
                  />
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
                {arrTaskType?.map((option, index) => (
                  <MenuItem
                    key={option.id}
                    // disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                    sx={{
                      width: '200px'
                    }}
                  >
                    {option.id === 1 ? <IconBug /> : <IconTask />}
                    <Typography textTransform={'uppercase'}>
                      {option.taskType}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* chip detail task */}
            <Stack direction="row" spacing={1}>
              <Chip
                label="Custom delete icon"
                // onClick={handleClick}
                // onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
              <Chip
                label="Custom delete icon"
                // onClick={handleClick}
                // onDelete={handleDelete}
                deleteIcon={<DeleteOutlineIcon />}
                variant="outlined"
              />
            </Stack>
          </Stack>
          {/* input description */}

          <Grid container spacing={5}>
            <Grid item xs={8}>
              <Box
                sx={{
                  width: '100%'
                  // border: '1px solid red'
                }}
              >
                <RedditTextField
                  multiline
                  defaultValue={arrTasKDetail?.description}
                  variant="filled"
                  fullWidth
                  // disableUnderline={true}
                  size="medium"
                />
              </Box>
              <InputLabel
                sx={{
                  marginBottom: '10px',
                  marginLeft: '10px',
                  marginTop: '10px'
                }}
              >
                Description
              </InputLabel>
              <Box
                sx={{
                  width: '100%',
                  margin: '0px 10px'
                }}
              >
                <Box
                  sx={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    minHeight: '30vh'
                  }}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={arrTasKDetail.description}
                    // onReady={editor => {
                    //   // You can store the "editor" and use when it is needed.
                    //   console.log('Editor is ready to use!', editor)
                    // }}
                    // onChange={(event, editor) => {
                    //   const data = editor.getData()
                    //   setDescription(data)
                    //   // console.log({ event, editor, data })
                    // }}
                    // onBlur={(event, editor) => {
                    //   console.log('Blur.', editor)
                    // }}
                    // onFocus={(event, editor) => {
                    //   console.log('Focus.', editor)
                    // }}
                  />
                </Box>
                <Stack
                  direction={'row'}
                  spacing={3}
                  mt={2}
                  justifyContent="center"
                >
                  <Button variant="contained" color="primary">
                    Upadate
                  </Button>
                  <Button variant="outlined">Cancle</Button>
                </Stack>
              </Box>
              {/* comments */}
              <Box>
                <InputLabel>Comments</InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'

                    // alignItems: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      width: '40px',
                      height: '40px'
                    }}
                  />
                  <Typography>Bui Vinh</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px'
                    // alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px'
                    }}
                  />
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Add your comment"
                    />
                    <Stack direction={'row'} my={3} spacing={3}>
                      <Button variant="contained">Save</Button>
                      <Button variant="outlined">Cancel</Button>
                    </Stack>
                  </Box>
                </Box>
                {/* show comment */}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'

                      // alignItems: 'center'
                    }}
                  >
                    <Avatar
                      sx={{
                        width: '40px',
                        height: '40px'
                      }}
                    />
                    <Typography>Bui Vinh</Typography>
                    <Typography>Oct 11, 2022, 2:34:11 AM</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'

                      // alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px'
                      }}
                    />
                    <Typography variant="body2">
                      here show your comment
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* RIGHT */}
            <Grid item xs={4}>
              <Box>
                <InputLabel>Status</InputLabel>
              </Box>
              <Box>
                <InputLabel>Reporter</InputLabel>
              </Box>
              <Box>
                <InputLabel>Assignees</InputLabel>
              </Box>
              <Box>
                <InputLabel>Prioirity</InputLabel>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default TaskDetail
