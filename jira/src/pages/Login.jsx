import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { rules } from 'src/utils/rules'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from 'src/redux/action/userAction'
import { LOADING } from 'src/redux/type/type'

const Login = () => {
  const { isLoading } = useSelector(state => state.stateReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(state => state.authReducer)

  console.log('loading:', isLoading)
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth, navigate])

  const handleLogin = data => {
    dispatch({
      type: LOADING,
      payLoad: true
    })
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      dispatch(signInAction(body))
    } catch (err) {
      console.log('err:', err)
    }

    console.log('body:', body)
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{
          mt: 1
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* <Controller /> */}
        <Controller
          name="email"
          control={control}
          rules={rules.email}
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Input Your Email"
              name="email"
              type="email"
              onChange={field.onChange}
              value={getValues('email')}
              disabled={false}
              error={errors['email']?.message !== undefined}
              helperText={errors['email']?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={rules.password}
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Input Your Password"
              name="password"
              type="password"
              onChange={field.onChange}
              value={getValues('password')}
              disabled={false}
              error={errors['password']?.message !== undefined}
              helperText={errors['password']?.message}
            />
          )}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={isLoading}
        >
          Login
        </LoadingButton>
        <Button component={Link} to="/signup" sx={{ textTransform: 'none' }}>
          Don't have an account? Signup
        </Button>
      </Box>
    </>
  )
}

export default Login
