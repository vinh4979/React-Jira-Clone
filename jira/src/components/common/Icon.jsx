import { Box, styled } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function Icon() {
  return <div>Icon</div>
}

export const IconTask = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1976d2',
      padding: '2px',
      marginRight: '10px',
      borderRadius: '5px'
    }}
  >
    <DoneIcon
      sx={{
        fontSize: '18px',
        color: 'white'
      }}
    />
  </Box>
)

export const IconBug = () => (
  <Box
    sx={{
      // border: '1px solid red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      padding: '2px',
      marginRight: '10px',
      borderRadius: '5px'
    }}
  >
    <FiberManualRecordIcon
      sx={{
        fontSize: '18px',
        color: 'white'
      }}
    />
  </Box>
)

const IconArrow = styled(ArrowUpwardIcon)(({ theme, props }) => ({
  color: props.itemColor,
  fontSize: '18px'
}))

export const ArrowIcon = ({ idPriority }) => {
  const typeIcon = idPriority

  const handleIcon = () => {
    if (typeIcon === 1) {
      const cssIcon = {
        itemColor: 'red',
        rotate: 'none'
      }
      return cssIcon
    }
    if (typeIcon === 2) {
      const cssIcon = {
        itemColor: 'orange',
        rotate: 'none'
      }
      return cssIcon
    }
    if (typeIcon === 3) {
      const cssIcon = {
        itemColor: 'lightgreen',
        rotate: '180deg'
      }
      return cssIcon
    }
    if (typeIcon === 4) {
      const cssIcon = {
        itemColor: 'green',
        rotate: '180deg'
      }
      return cssIcon
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
        marginRight: '10px',
        border: ` 1px solid ${handleIcon().itemColor}`,
        borderRadius: '5px',
        rotate: handleIcon().rotate
      }}
    >
      <IconArrow props={handleIcon()} />
    </Box>
  )
}
