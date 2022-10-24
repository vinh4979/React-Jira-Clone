import { LoadingButton } from '@mui/lab'
import { Box, Grid, Paper, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Dnd from 'src/components/common/Dnd'
// import Dnd from 'src/components/common/Dnd'
import Dnd2 from 'src/components/common/Dnd2'
import Framer from 'src/components/common/Framer'
import Main from 'src/components/common/Main'
export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
  return (
    <>
      <Main />
    </>
  )
}
