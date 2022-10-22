import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL_EDIT_TASK } from 'src/redux/type/type'
import TagButton from '../TagButton'
import CampaignIcon from '@mui/icons-material/Campaign'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import CloseIcon from '@mui/icons-material/Close'
import { withFormik } from 'formik'
import { getTaskDetailAction } from 'src/redux/action/ProjectAuthorizeAction'
import SelectedMenu from '../input.component/SelectedMenu'
import { useState } from 'react'
import InputFormEdit from '../input.component/InputFormEdit'

const ModalEditTaskLayout = props => {
  const arrTaskDetail = props.arrTaskDetail
  const arrTaskType = props.arrTaskType
  const { handleSubmit, handleChange, setFieldValue } = props

  // console.log('edit task - check props:', arrTaskDetail)
  // console.log(
  //   'edit task - check values task item:',
  //   arrTaskDetail.taskTypeDetail?.id
  // )

  const dispatch = useDispatch()
  const open = useSelector(state => state.stateReducer.modalEditTask)

  // console.log('modal Edit task - check selected item:', item)

  const setItem = item => {
    console.log('modal Edit task - check selected item:', item)
    setFieldValue('taskTypeDetail', item)
    handleSubmit()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() =>
          dispatch({
            type: CLOSE_MODAL_EDIT_TASK
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          padding: '5rem'
        }}
      >
        <Box
          sx={{
            bgcolor: theme =>
              theme.palette.mode === 'dark' ? 'black' : 'green',
            border: '1px solid',
            width: 700,
            height: '200vh'
          }}
        >
          <Stack direction={'row'} justifyContent="space-between">
            <Box>
              <SelectedMenu
                option={arrTaskType}
                getValue={setItem}
                initSelect={1}
              />
            </Box>
            <Stack direction={'row'} spacing={2}>
              <TagButton>
                <CampaignIcon /> Give Feedback
              </TagButton>
              <TagButton>
                <DeleteOutlineIcon />
              </TagButton>
              <TagButton>
                <ZoomOutMapIcon />
              </TagButton>
              <TagButton>
                <CloseIcon />
              </TagButton>
            </Stack>
          </Stack>
          {/* task name */}
          <Box>
            <InputFormEdit
              name="taskName"
              getValue={handleChange}
              defaultValue={arrTaskDetail?.taskName}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

const ModalEditTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const arrTaskDetail = props.arrTaskDetail

    // console.log('edit task - taskid: ', taskId)
    // console.log('edit task - get task detail: ', arrTaskDetail)

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
        typeId: arrTaskDetail?.originalEstimate,
        priorityId: arrTaskDetail?.originalEstimate
      }
    } else {
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
    console.log('Modal edit task - handlesubmit', values, props, setSubmitting)
    // props.dispatch(createProjectAthorizeAction(values, props.navigate))
  }
})(ModalEditTaskLayout)

const mapStateToProps = state => {
  return {
    // arrProjectCategory: state.projectCategoryReducer.projectCategory,
    // navigate: state.stateReducer.navigate
    // taskId: state.stateReducer.taskId, //project detail have taskid

    arrTaskDetail: state.projectReducer.arrTasKDetail,
    arrTaskType: state.taskTypeReducer.arrTaskType
  }
}

export default connect(mapStateToProps)(ModalEditTask)
