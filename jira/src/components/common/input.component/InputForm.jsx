import { Box, InputLabel, TextField } from '@mui/material'
import React from 'react'

const InputForm = ({ getValue, name, placeholder, label, defaultValue }) => {
  return (
    <>
      <Box
        component="div"
        sx={{
          marginBottom: '10px'
        }}
      >
        <InputLabel
          sx={{
            textTransform: 'capitalize',
            marginBottom: '10px'
          }}
        >
          {label}
        </InputLabel>
        <TextField
          // color={theme =>
          //   theme.palette.mode === 'dark'
          //     ? 'rgba(255,255,255,0.65)'
          //     : 'rgba(0,0,0,.85)'
          // }
          name={name}
          fullWidth
          required
          placeholder={placeholder}
          size="small"
          onChange={getValue}
          defaultValue={defaultValue ? defaultValue : null}
          sx={{
            backgroundColor: '#141414',
            '& .MuiOutlinedInput-root': {
              // color: `${theme =>
              //   theme.palette.mode === 'dark'
              //     ? 'rgba(255,255,255,0.65)'
              //     : 'rgba(0,0,0,.85)'}`,
              // color: 'rgba(255,255,255,0.65)',
              '&.Mui-focused fieldset': {
                borderColor: '#177dcc'
              }
            }
          }}
        />
      </Box>
    </>
  )
}

export default InputForm
