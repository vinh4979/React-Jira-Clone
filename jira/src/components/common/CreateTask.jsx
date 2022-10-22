import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import 'src/assets/css/custom-editor.css'
import { useDispatch } from 'react-redux'
import { ProjectCategoryAction } from 'src/redux/action/ProjectCategoryAction'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { createTaskAction } from 'src/redux/action/ProjectAuthorizeAction'
import { taskTypeAction } from '../../redux/action/TaskTypeAction'
import { priorityAction } from '../../redux/action/PriorityAction'
import { getUserAction } from 'src/redux/action/userAction'
import { getIconTaskPriority, getIonTaskType } from '../../utils/constant'

import Checkbox from '@mui/material/Checkbox'
import { useNavigate, useParams } from 'react-router-dom'

// seclect chip
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

export default function CreateTask() {
  const dispatch = useDispatch()
  const param = useParams()
  const projectId = param.id
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(ProjectCategoryAction())
    dispatch(taskTypeAction())
    dispatch(priorityAction())
    dispatch(getUserAction())
  }, [dispatch])

  const { control, handleSubmit } = useForm({
    defaultValues: {
      taskName: ''
    }
  })
  const { arrTaskType } = useSelector(state => state.taskTypeReducer)
  const { arrPriority } = useSelector(state => state.priorityReducer)
  const { arrUser } = useSelector(state => state.userReducer)
  const [description, setDescription] = useState()

  const [taskType, setTaskType] = useState(1)
  const [priorityTask, setPriorityTask] = useState(1)

  const handleTaskType = e => {
    setTaskType(e.target.value)
  }
  const handlePriorityTask = e => {
    setPriorityTask(e.target.value)
  }
  console.log('task type:', arrUser) // seclected chip
  const [personName, setPersonName] = React.useState([])

  const handleGetUserId = () => {
    const arr = []
    personName.map(item => {
      return arr.push(item.userId)
    })
    return arr
  }

  console.log('get user id:', handleGetUserId())

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPersonName(value)
  }

  const handleGetInfo = data => {
    const body = {
      listUserAsign: handleGetUserId(),
      taskName: data.taskName,
      description: description,
      statusId: '1',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectId,
      typeId: taskType,
      priorityId: priorityTask
    }
    console.log('body:', body)
    dispatch(createTaskAction(body, navigate))
  }

  return (
    <Box
      sx={{
        height: '120vh'
      }}
    >
      <Box
        sx={{
          maxWidth: '700px'
        }}
      >
        <Paper
          sx={{
            padding: '20px 30px'
          }}
        >
          <Typography variant="h5" py={3}>
            Create Task
          </Typography>

          {/* form */}
          <Box component="form" onSubmit={handleSubmit(handleGetInfo)}>
            {/* task name */}
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
                required
              >
                Task Name:
              </InputLabel>
              <Controller
                name="taskName"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="taskName"
                    // label="Size"
                    // id="outlined-size-small"
                    // defaultValue="Small"
                    required
                    placeholder="Type task name"
                    size="small"
                    fullWidth
                    onChange={field.onChange}
                  />
                )}
              />
            </Box>
            {/* Task type */}
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                Task Type
              </InputLabel>
              <Select
                // {...field}
                name="categoryId"
                // value={categoryChoose}
                onChange={handleTaskType}
                fullWidth
                size="small"
                defaultValue={1}
                required
              >
                {arrTaskType?.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      <Stack direction={'row'}>
                        {getIonTaskType(item.id)}
                        <Typography
                          sx={{
                            textTransform: 'capitalize'
                          }}
                        >
                          {item.taskType}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  )
                })}
              </Select>
            </Box>
            {/* Task priority */}
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                Task priority
              </InputLabel>
              <Select
                // {...field}
                name="categoryId"
                // value={categoryChoose}
                onChange={handlePriorityTask}
                fullWidth
                size="small"
                defaultValue={1}
                required
              >
                {arrPriority?.map(item => {
                  return (
                    <MenuItem key={item.priorityId} value={item.priorityId}>
                      <Stack direction={'row'}>
                        {getIconTaskPriority(item.priorityId)}
                        <Typography>{item.priority}</Typography>
                      </Stack>
                    </MenuItem>
                  )
                })}
              </Select>
            </Box>
            {/* description */}
            <Box
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                Description
              </InputLabel>
              <Box
                sx={{
                  width: '100%',
                  height: '20vh',
                  borderRadius: '5px',
                  overflow: 'auto',
                  border: '1px solid gray',
                  position: 'relative'
                }}
              >
                {/* <CKEditor editor={ClassicEditor} /> */}
                <CKEditor
                  editor={ClassicEditor}
                  // data="<p>Hello from CKEditor 5!</p>"
                  // onReady={editor => {
                  //   // You can store the "editor" and use when it is needed.
                  //   console.log('Editor is ready to use!', editor)
                  // }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                    // console.log({ event, editor, data })
                  }}
                  // onBlur={(event, editor) => {
                  //   console.log('Blur.', editor)
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log('Focus.', editor)
                  // }}
                />
              </Box>
            </Box>
            {/* assignees */}
            <Box
              component="div"
              sx={{
                marginBottom: '10px'
              }}
            >
              <InputLabel
                sx={{
                  marginBottom: '5px'
                }}
              >
                User Assignees
              </InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                // renderValue={selected => selected.join(', ')}
                // displayEmpty
                MenuProps={MenuProps}
                fullWidth
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>Add user assignees</em>
                  }
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip
                          key={value.userId}
                          avatar={<Avatar alt="Natacha" src={value.avatar} />}
                          label={value.name}
                        />
                      ))}
                    </Box>
                  )
                }}
                sx={{
                  position: 'relative'
                }}
              >
                {arrUser?.map(name => (
                  <MenuItem key={name.userId} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* button access */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                sx={{
                  marginTop: '2rem'
                }}
                variant="contained"
                type="submit"
              >
                Create task
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
