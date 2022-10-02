import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { LOADING } from 'src/redux/type/type'
import authUtils from 'src/utils/auth'
import Loading from '../common/Loading'
import Sidebar from '../common/Sidebar'

const AppLayout = () => {
  // fake check in account

  const { isLoading } = useSelector(state => state.stateReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
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
  return isLoading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
