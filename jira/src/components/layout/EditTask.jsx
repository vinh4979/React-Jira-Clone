import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import {
  Box,
  Breadcrumbs,
  Button,
  InputLabel,
  Link,
  Paper,
  Typography
} from '@mui/material'
import InputForm from '../common/input.component/InputForm'
import { useDispatch, connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTaskDetailAction } from 'src/redux/action/ProjectAuthorizeAction'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import SelectInput from 'src/components/common/input.component/SelectInput'
import { statusAction } from '../../redux/action/StatusAction'

function EditTaskLayout(props) {
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    arrTaskDetail,
    arrStatus,
    arrTaskType,
    arrPriority
  } = props
  const param = useParams()
  const idTask = param.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTaskDetailAction(idTask))
    dispatch(statusAction())
  }, [dispatch])

  //GET DATA FORM EDITOR
  const handleGetDataEditor = (event, editor) => {
    const data = editor.getData()
    setFieldValue('description', data)
  }
  console.log('edit task - check status:', props.values)
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          React Jira Clone
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Task Detail
        </Link>
        <Typography color="text.primary">Edit Task </Typography>
      </Breadcrumbs>
      <Paper
        sx={{
          maxWidth: '700px',
          padding: '20px',
          my: 3
        }}
      >
        <Box component={'form'} onSubmit={handleSubmit}>
          {/* task name */}
          <Box
            sx={{
              marginBottom: '10px'
            }}
          >
            <InputForm
              label="Task name"
              name="taskName"
              getValue={handleChange}
              defaultValue={arrTaskDetail?.taskName}
            />
          </Box>
          {/* description */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <InputLabel
              sx={{
                marginBottom: '10px'
              }}
            >
              Desciption
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
              {/* <StyledEditor> */}
              <CKEditor
                editor={ClassicEditor}
                data={arrTaskDetail?.description}
                onChange={handleGetDataEditor}
              />
              {/* </StyledEditor> */}
            </Box>
          </Box>
          {/* status */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <SelectInput
              values={props.values.statusId.toString()}
              name="statusId"
              getValue={handleChange}
              label="Status"
              data={arrStatus}
            />
          </Box>
          {/* type task  */}
          <Box
            sx={{
              marginBottom: '20px'
            }}
          >
            <SelectInput
              values={props.values.typeId}
              name="typeId"
              getValue={handleChange}
              label="Task type"
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
          {/* submit button */}
          <Box textAlign={'center'}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

const EditTask = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: props => {
    const arrTaskDetail = props.arrTaskDetail
    console.log('edit task - get task detail: ', arrTaskDetail)
    if (arrTaskDetail !== null) {
      return {
        listUserAsign: [0],
        taskName: arrTaskDetail?.taskName,
        description: arrTaskDetail?.description,
        statusId: arrTaskDetail?.statusId,
        originalEstimate: arrTaskDetail?.originalEstimate,
        timeTrackingSpent: arrTaskDetail?.timeTrackingSpent,
        timeTrackingRemaining: arrTaskDetail?.timeTrackingRemaining,
        projectId: arrTaskDetail?.projectId,
        typeId: arrTaskDetail?.typeId,
        priorityId: arrTaskDetail?.priorityId
      }
    }
    if (arrTaskDetail === null) {
      return {
        listUserAsign: [0],
        taskName: '',
        description: '',
        statusId: '',
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
      }
    }
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    // const body = values
    // const idProject = props.arrProjectDetail.id
    // const navigate = props.navigate
    console.log('handlesubmit', values)
    // props.dispatch(updateProjectAction(body, idProject, navigate))
  }
})(EditTaskLayout)

const mapStateToProps = state => {
  return {
    arrTaskDetail: state.projectReducer.arrTasKDetail,
    arrStatus: state.statusReducer.arrStatus,
    arrTaskType: state.taskTypeReducer.arrTaskType,
    arrPriority: state.priorityReducer.arrPriority
    // navigate: state.stateReducer.navigate
  }
}
export default connect(mapStateToProps)(EditTask)
