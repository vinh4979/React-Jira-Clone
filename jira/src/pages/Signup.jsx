import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signUpAction } from 'src/redux/action/userAction'
import { LOADING } from 'src/redux/type/type'
import { rules } from 'src/utils/rules'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.stateReducer)
  const { auth } = useSelector(state => state.authReducer)
  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth])

  console.log('reducer:', loading)

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      name: '',
      phone: ''
    }
  })

  const handleSignin = data => {
    // dispatch({
    //   type: LOADING,
    //   payLoad: true
    // })
    const body = {
      email: data.email,
      password: data.password,
      name: data.name,
      phoneNumber: data.phone
    }
    try {
      dispatch(signUpAction(body))
    } catch (err) {
      console.log('err:', err)
    }
  }

  return (
    <>
      <Box
        component="form"
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleSignin)}
        noValidate
      >
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
          name="name"
          control={control}
          rules={rules.name}
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Input Your Name"
              name="name"
              type="text"
              onChange={field.onChange}
              value={getValues('name')}
              disabled={false}
              error={errors['name']?.message !== undefined}
              helperText={errors['name']?.message}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={rules.phone}
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Input Your phone"
              name="phone"
              type="number"
              onChange={field.onChange}
              value={getValues('phone')}
              disabled={false}
              error={errors['phone']?.message !== undefined}
              helperText={errors['phone']?.message}
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
        <Controller
          name="confirmedPassword"
          control={control}
          rules={{
            ...rules.confirmedPassword,
            validate: {
              samePassword: v =>
                v === getValues('password') || 'Mật khẩu không khớp'
            }
          }}
          render={({ field }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmedPassword"
              label="Input Your confirmedPassword"
              name="confirmedPassword"
              type="password"
              onChange={field.onChange}
              value={getValues('confirmedPassword')}
              disabled={false}
              error={errors['confirmedPassword']?.message !== undefined}
              helperText={errors['confirmedPassword']?.message}
            />
          )}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: 'none' }}>
        Already have an account? Login
      </Button>
    </>
  )
}

export default Signup
