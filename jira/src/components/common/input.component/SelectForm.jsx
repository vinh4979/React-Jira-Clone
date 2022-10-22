import {
  Box,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled
} from '@mui/material'
import React, { useState } from 'react'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: ' #141414',
    border: '1px solid #434343',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      // borderRadius: 4,
      borderColor: '#177ddc',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    '&:hover': {
      borderColor: theme.palette.action.active
    }
  }
}))
const SelectForm = ({ getValue, item, label }) => {
  const [index, setIndex] = useState(2)
  return (
    <Box component={'div'}>
      <InputLabel
        sx={{
          textTransform: 'capitalize',
          marginBottom: '10px'
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={item}
        size="small"
        fullWidth
        onChange={getValue}
        // sx={{
        //   backgroundColor: '#141414',
        //   '& .& MuiInputBase-input': {
        //     '&.Mui-focused fieldset': {
        //       borderColor: '#177dcc'
        //     }
        //   }
        // }}
        input={<BootstrapInput />}
      >
        <MenuItem
          // sx={{
          //   backgroundColor: `${index === 1 ? 'red' : 'transparent'}`,
          //   '&:hover': {
          //     backgroundColor: 'green'
          //   },

          //   '&:active': {
          //     backgroundColor: 'red'
          //   }
          // }}
          value={10}
        >
          Ten
        </MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Box>
  )
}

export default SelectForm
