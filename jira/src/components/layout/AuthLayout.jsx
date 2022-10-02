import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../common/Loading'
import assets from '../../assets'
import authUtils from 'src/utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from 'src/redux/type/type'

const AuthLayout = () => {
  // fake check in account

  // const [loading, setLoading] = useState(false)
  const { isloading, modeSystem } = useSelector(state => state.stateReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) {
        dispatch({
          type: LOADING,
          payLoad: false
        })
      } else {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate, dispatch])

  return isloading ? (
    <Loading fullHeight />
  ) : (
    <Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <img
            src={modeSystem ? assets.images.logoDark : assets.images.logoLight}
            style={{ width: '100px' }}
            alt="app logo"
          />
          <Outlet />
        </Box>
      </Container>
    </Box>
  )
}

export default AuthLayout
