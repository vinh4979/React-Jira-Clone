import {
  Box,
  Button,
  InputLabel,
  Modal,
  Slider,
  styled,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL } from 'src/redux/type/type'
import InputForm from '../input.component/InputForm'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import MultiSelectAutocomplete from '../input.component/MultiSelectAutocomplete'
import { withFormik } from 'formik'
import { taskTypeAction } from 'src/redux/action/TaskTypeAction'
import { priorityAction } from 'src/redux/action/PriorityAction'
import SelectInput from 'src/components/common/input.component/SelectInput'
import { getAllUserAction } from 'src/redux/action/userAction'
import { Stack } from '@mui/system'
import { createTaskAction } from 'src/redux/action/ProjectAuthorizeAction'

const StyledModal = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  // alignItems: 'center',
  height: '100%',
  overflow: 'scroll'
})

const StyleContainer = styled('div')(({ theme }) => ({
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 600,
  height: '100%',
  marginTop: '50px',
  boxShadow: 24,
  backgroundColor: 'black',
  padding: '30px',
  border: '1px solid grey',
  boxShadow: `${theme.shadows[24]}`
}))

const ModalCreateTaskLayout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(ProjectCategoryAction())
    dispatch(taskTypeAction())
    dispatch(priorityAction())
    // dispatch(getUserAction())
    dispatch(getAllUserAction())
  }, [dispatch])

  const { modal } = useSelector(state => state.stateReducer)
  const { handleSubmit, handleChange, setFieldValue, arrAllUser } = props
  const arrTaskType = props.arrTaskType
  const arrPriority = props.arrPriority

  //get data from editor
  const handleGetDataEditor = (event, editor) => {
    const data = editor.getData()
    setFieldValue('description', data)
  }

  // get data form multi select form\
  const [assgin, setAssgin] = useState([])
  const handleGetValueAssign = (event, value) => {
    setAssgin(value)
    const arr = []
    value.forEach(item => {
      arr.push(item.userId)
    })

    setFieldValue('listUserAsign', arr)
    console.log('check event:', event)
  }

  // time trackinng

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0
  })

  const handleTimeTrackingSpent = e => {
    setTimeTracking({
      ...timeTracking,
      timeTrackingSpent: e.target.value
    })
    setFieldValue('timeTrackingSpent', Number(e.target.value))
  }

  const handleTimeTrackingRemaining = e => {
    setTimeTracking({ ...timeTracking, timeTrackingRemaining: e.target.value })
    setFieldValue('timeTrackingRemaining', Number(e.target.value))
  }

  return (
    <StyledModal
      open={modal}
      onClose={() =>
        dispatch({
          type: CLOSE_MODAL,
          payload: false
        })
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyleContainer borderRadius={1}>
        <Typography
          textAlign={'center'}
          variant="h5"
          fontWeight={700}
          py={2}
          // color="gray"
        >
          CREATE TASK
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* input task name */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <InputForm
              label="Task name"
              name="taskName"
              getValue={handleChange}
              placeholder={'Input your task name'}
            />
          </Box>

          {/* task type */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <SelectInput
              values={props.values.typeId}
              label="Task Type"
              name="typeId"
              getValue={handleChange}
              data={arrTaskType}
            />
          </Box>

          {/* task priority */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <SelectInput
              label="Task Priority"
              values={props.values.priorityId}
              name="priorityId"
              getValue={handleChange}
              data={arrPriority}
            />
          </Box>

          {/* description */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <InputLabel
              sx={{
                marginBottom: '10px'
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
                border: '1px solid gray'
                // position: 'relative'
              }}
            >
              <CKEditor editor={ClassicEditor} onChange={handleGetDataEditor} />
            </Box>
          </Box>

          {/* assgignUser */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <MultiSelectAutocomplete
              arrAllUser={arrAllUser}
              getValue={handleGetValueAssign}
              defaultValue={assgin}
            />
          </Box>
          {/* time tracker  */}
          <Box>
            <InputLabel>Time tracking</InputLabel>
            <Box>
              <Slider
                defaultValue={5}
                aria-label="Disabled slider "
                size="small"
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
                value={timeTracking.timeTrackingSpent}
              />
              <Stack direction={'row'} justifyContent="space-between">
                <Typography fontWeight={900}>
                  {timeTracking.timeTrackingSpent}h logged
                </Typography>
                <Typography fontWeight={900}>
                  {timeTracking.timeTrackingRemaining}h Remaining
                </Typography>
              </Stack>
            </Box>

            <Stack direction={'row'} justifyContent="space-between" spacing={3}>
              <Box
                component={'div'}
                sx={{
                  width: '100%'
                }}
              >
                <Typography>Time Tracking Spent</Typography>
                <TextField
                  name="timeTrackingSpent"
                  fullWidth
                  defaultValue="0"
                  type="number"
                  size="small"
                  onChange={handleTimeTrackingSpent}
                />
              </Box>
              <Box
                component={'div'}
                sx={{
                  width: '100%'
                }}
              >
                <Typography>Time Tracking Remaining</Typography>
                <TextField
                  name="timeTrackingRemaining"
                  defaultValue={0}
                  fullWidth
                  type="number"
                  size="small"
                  onChange={handleTimeTrackingRemaining}
                />
              </Box>
            </Stack>
          </Box>
          {/* original Estimate */}
          <Box>
            <InputLabel>Original Estimate</InputLabel>
            <TextField
              defaultValue={0}
              fullWidth
              type="number"
              size="small"
              name="originalEstimate"
              onChange={handleChange}
            />
          </Box>

          {/* button */}
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
      </StyleContainer>
    </StyledModal>
  )
}

const ModalCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const arrTaskType = props.arrTaskType
    const arrPriority = props.arrPriority
    const idProject = props.idProject

    return {
      listUserAsign: [0],
      taskName: '',
      description: '',
      statusId: '1',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: idProject,
      typeId: arrTaskType ? arrTaskType[0]?.id : 1,
      priorityId: arrPriority ? arrPriority[0]?.priorityId : 1
    }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('handlesubmit', props, 'values:', values)
    // console.log('navigate:', props.navigate)
    props.dispatch(createTaskAction(values, props.navigate))
  }
})(ModalCreateTaskLayout)

const mapStateToProps = state => {
  return {
    // connect redux to getValue
    arrTaskType: state.taskTypeReducer.arrTaskType,
    arrPriority: state.priorityReducer.arrPriority,
    arrAllUser: state.userReducer.arrAllUser,
    arrAssign: state.stateReducer.arrAssign,
    idProject: state.stateReducer.idProject,
    navigate: state.stateReducer.navigate
  }
}

export default connect(mapStateToProps)(ModalCreateTask)
