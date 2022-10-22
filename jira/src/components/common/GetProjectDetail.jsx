import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GetProjectDetail({ myProject, user }) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid orange',
        flexDirection: 'column'
      }}
    >
      <Typography>Projiect's name: {myProject.projectName} </Typography>
      <Button variant="contained" onClick={() => navigate('/create-task')}>
        Create Task
      </Button>
    </Box>
  )
}
