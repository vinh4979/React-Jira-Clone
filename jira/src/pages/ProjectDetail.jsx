import {
  Avatar,
  AvatarGroup,
  Box,
  Breadcrumbs,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  assignUserProjectAction,
  deleteProjectAction,
  getProjectDetailAction,
  getTaskDetailAction
} from 'src/redux/action/ProjectAuthorizeAction'
import TaskIcon from '@mui/icons-material/Task'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'
import TagButton from 'src/components/common/TagButton'
import TootipAddMember from 'src/components/common/TootipAddMember'
import { getUserAction } from 'src/redux/action/userAction'
import {
  OPEN_MODAL,
  OPEN_MODAL_EDIT_TASK,
  OPEN_MODAL_TASK_DETAIL
} from '../redux/type/type'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { updateStatusAction } from 'src/redux/action/StatusAction'
const ProjectDetail = () => {
  const idProject = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let projectId = +idProject.id

  const [reRender, setRerender] = useState(false)
  const { modal } = useSelector(state => state.stateReducer)
  const { arrProjectDetail } = useSelector(state => state.projectReducer)
  const { arrUser } = useSelector(state => state.userReducer)

  useEffect(() => {
    dispatch(getProjectDetailAction(idProject.id))
  }, [dispatch, reRender, modal])

  // INPUT SEARCH
  const [inputSearch, setInputSearch] = useState('')

  // ACTIVE BUTTON TAG
  const [tagActive, setTagActive] = useState(false)
  const handleClick = () => {
    setTagActive(!tagActive)
  }

  //DELETE PROJECT
  const handleDeleteProject = () => {
    dispatch(deleteProjectAction(idProject.id, navigate))
  }

  // TOOLTIP
  const getValue = (event, newValue) => {
    const body = {
      projectId: projectId,
      userId: newValue.userId
    }
    dispatch(assignUserProjectAction(body))
    setRerender(!reRender)
  }

  const getInputValue = (event, newInputValue) => {
    // console.log('get input value:', newInputValue)
    dispatch(getUserAction(newInputValue))
  }

  // ASSIGN USER PROJECT
  const handleAssignUserProject = () => {
    // console.log('assign user project ')
    // dispatch(getUserAction())
    // dispatch({
    //   type: ADD_USER_PROJECT,
    //   payload: true,
    //   idProject: idProject.id
    // })
  }

  const handleOnDragEnd = result => {
    const body = {
      taskId: result.draggableId,
      statusId: result.destination.droppableId
    }
    // console.log('body:', body)
    dispatch(updateStatusAction(body))
    setRerender(!reRender)
  }

  // HANDLE EDIT TASK
  const handleGetTaskDetail = taskId => {
    dispatch({
      type: OPEN_MODAL_TASK_DETAIL,
      taskId: taskId
    })
    dispatch(getTaskDetailAction(taskId))
  }

  return (
    <Box>
      {/* bread crumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          React Jira Clone
        </Link>
        <Link underline="hover" color="inherit" href="/">
          My project
        </Link>
        <Typography color="text.primary">Detail project </Typography>
      </Breadcrumbs>
      {/* Detail project */}
      <Box
        my={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={900}>
            {arrProjectDetail?.projectName}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Chip
            label="Edit project"
            onClick={() => navigate(`/edit-project/${idProject.id}`)}
          />
          <Chip
            label="Delete project"
            onClick={handleDeleteProject}
            color="error"
            variant="outlined"
          />
        </Stack>
      </Box>
      <Stack mb={3} direction="row" spacing={2}>
        <TextField
          placeholder="Search task"
          size="small"
          sx={{
            width: '500px'
          }}
          onChange={e => setInputSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <AvatarGroup max={3}>
          {arrProjectDetail?.members.map((item, index) => {
            return <Avatar key={index} alt="Remy Sharp" src={item.avatar} />
          })}
        </AvatarGroup>
        <TootipAddMember
          getValue={getValue}
          getInputValue={getInputValue}
          arrUser={arrUser}
        >
          <Avatar onClick={handleAssignUserProject}>
            <IconButton aria-label="add to shopping cart">
              <AddIcon />
            </IconButton>
          </Avatar>
        </TootipAddMember>

        {/* tag button */}
        <Stack
          sx={{
            width: '100%'
          }}
          direction={'row'}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <TagButton
            // onClick={() => navigate(`/create-task/${arrProjectDetail.id}`)}
            onClick={() =>
              dispatch({
                type: OPEN_MODAL,
                payload: Number(idProject.id),
                navigate: navigate
              })
            }
          >
            Create task
          </TagButton>
          <Stack direction={'row'} spacing={2} alignItems="center">
            <TagButton active={tagActive} onClick={handleClick}>
              Only My Task
            </TagButton>

            <TagButton active={tagActive} onClick={handleClick}>
              Ignore Resolved
            </TagButton>

            <TagButton active={tagActive} onClick={handleClick}>
              Clear all
            </TagButton>
          </Stack>
        </Stack>
      </Stack>
      {/* blog status board */}
      <Box
        sx={{
          flexGrow: 1,
          height: '70vh',
          overflow: 'hidden',
          marginBottom: '10px'
        }}
      >
        <Stack direction="row" width={'100%'} height={'100%'} spacing={3}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {arrProjectDetail?.lstTask.map(status => {
              return (
                <Droppable key={status.statusId} droppableId={status.statusId}>
                  {provided => {
                    return (
                      <Paper
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        elevation={3}
                        sx={{
                          flexGrow: 1,
                          width: '100%',
                          height: '100%',
                          padding: '10px'
                          // backgroundColor: 'green'
                        }}
                      >
                        <Typography my={2}>
                          {status.statusName} :{' '}
                          {
                            status.lstTaskDeTail?.filter(item =>
                              item.taskName.includes(inputSearch)
                            ).length
                          }
                        </Typography>
                        <Box
                          sx={{
                            // border: ' 1px solid',
                            width: '100%',
                            height: '55vh',
                            overflow: 'auto'
                          }}
                        >
                          <Stack>
                            {status.lstTaskDeTail
                              ?.filter(item =>
                                item.taskName
                                  .toLowerCase()
                                  .includes(inputSearch)
                              )
                              .map((task, index) => {
                                return (
                                  <Draggable
                                    key={task.taskId.toString()}
                                    index={index}
                                    draggableId={task.taskId.toString()}
                                  >
                                    {provided => {
                                      return (
                                        <Paper
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          key={task.taskId}
                                          // elevation={5}
                                          variant="outlined"
                                          sx={{
                                            padding: '10px',
                                            marginBottom: '10px'
                                          }}
                                          // onClick={() =>
                                          //   navigate(`/task/${task.taskId}`)
                                          // }
                                          onClick={() =>
                                            navigate(
                                              `/edit-task/${task.taskId}`
                                            )
                                          }
                                        >
                                          <Typography variant="body1" mb={1}>
                                            {task.taskName}
                                          </Typography>
                                          <Stack
                                            direction={'row'}
                                            justifyContent="space-between"
                                          >
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                              }}
                                            >
                                              <Avatar
                                                sx={{ width: 30, height: 30 }}
                                              />
                                              <Typography>
                                                Task-{task.taskId}
                                              </Typography>
                                            </Box>
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                              }}
                                            >
                                              <TaskIcon />
                                              <ArrowUpwardIcon />
                                            </Box>
                                          </Stack>
                                        </Paper>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                          </Stack>
                        </Box>
                        {provided.placeholder}
                      </Paper>
                    )
                  }}
                </Droppable>
              )
            })}
          </DragDropContext>
        </Stack>
      </Box>
    </Box>
  )
}

export default ProjectDetail
