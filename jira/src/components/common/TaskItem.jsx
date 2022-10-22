import { Avatar, Box, styled, Typography } from '@mui/material'
import React from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function TaskItem() {
  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: '10px',
    borderRadius: '10px'
    // marginBottom: '10px'
  }))
  return (
    <>
      <Item>
        <Typography variant="h6" fontWeight={700} color={'text.primary'}>
          Tast react
        </Typography>
        <Box
          sx={{
            marginTop: '10px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Avatar
              alt="user"
              sx={{
                width: '30px',
                height: '30px'
              }}
            />
            <Typography>TASK-1111</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AssignmentIcon />
            <ArrowUpwardIcon />
          </Box>
        </Box>
      </Item>
    </>
  )
}
