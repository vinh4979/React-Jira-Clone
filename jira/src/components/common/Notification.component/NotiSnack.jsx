import { Snackbar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { NOTI_SNACK } from 'src/redux/type/type'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const NotiSnack = () => {
  const dispatch = useDispatch()
  // REDUX
  const { notiSnack } = useSelector(state => state.stateReducer)

  console.log('reducer noti:', notiSnack)

  const handleClose = (event, reason) => {
    console.log('handle close snack bar:', event, reason)
    if (reason === 'clickaway') {
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: false,
          type: '',
          message: ''
        }
      })
    }
    dispatch({
      type: NOTI_SNACK,
      payload: {
        open: false,
        type: '',
        message: ''
      }
    })
  }

  return (
    <>
      <Snackbar
        open={notiSnack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          onClose={handleClose}
          severity={notiSnack.type}
          sx={{ width: '100%' }}
        >
          {notiSnack.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default NotiSnack
