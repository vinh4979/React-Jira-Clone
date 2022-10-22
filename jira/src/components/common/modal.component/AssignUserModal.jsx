import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { Box, DialogActions, DialogContent } from '@mui/material'
import MultiSelectInput from '../input.component/MultiSelectInput'
import { useSelector } from 'react-redux'
import { ADD_USER_PROJECT } from 'src/redux/type/type'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserAction } from 'src/redux/action/userAction'
import { assignUserProjectAction } from 'src/redux/action/ProjectAuthorizeAction'

const emails = ['username@gmail.com', 'user02@gmail.com']

function SimpleDialog(props) {
  const { onClose, open, arrUser, dispatch, idProject } = props
  const [body, setBody] = React.useState()

  const handleGetAssignUser = (event, newValue) => {
    setBody(newValue)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        sx={{
          width: '60vh'
          // height: '70vh'
        }}
      >
        <DialogTitle textAlign={'center'}>Assign User</DialogTitle>
        <DialogContent dividers>
          <MultiSelectInput arrUser={arrUser} getValue={handleGetAssignUser} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(assignUserProjectAction(idProject, body))}
          >
            ok
          </Button>
          <Button>Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}

export default function AssignUserModal() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserAction())
  }, [dispatch])

  const { arrUser } = useSelector(state => state.userReducer)
  const { isModalAddUserProject, idProject } = useSelector(
    state => state.stateReducer
  )
  console.log('ismodal:', isModalAddUserProject)

  const handleClose = () => {
    dispatch({
      type: ADD_USER_PROJECT,
      payload: false
    })
  }

  return (
    <div>
      <SimpleDialog
        open={isModalAddUserProject}
        onClose={handleClose}
        arrUser={arrUser}
        dispatch={dispatch}
        idProject={idProject}
      />
    </div>
  )
}
