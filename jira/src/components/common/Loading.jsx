import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = props => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: props.fullHeght ? '100%' : '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
