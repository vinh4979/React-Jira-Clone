import React, { useEffect, useState } from 'react'
import { styled, TextField } from '@mui/material'

const RedditTextField = styled(props => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    margin: '`10px 0px',
    fontSize: '24px',
    padding: '10px 10px',
    backgroundColor: 'transparent',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    '&:hover': {
      backgroundColor: '#2b2b2b'
    },
    '&.Mui-focused': {
      backgroundColor: '#2b2b2b'
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`
    }
  }
}))

export default function InputFormEdit({ name, getValue, defaultValue }) {
  console.log('input form edit - check default', defaultValue)
  const [value, setValue] = useState()
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  return (
    <RedditTextField
      multiline
      defaultValue={value}
      variant="filled"
      fullWidth
      // disableUnderline={true}
      size="medium"
      name={name}
      onChange={getValue}
    />
  )
}
