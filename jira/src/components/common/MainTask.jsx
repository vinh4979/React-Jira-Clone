import { styled } from '@mui/material'
import React from 'react'

const MainContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  border: '1px solid red',
  height: '90vh'
}))

export default function MainTask() {
  return (
    <>
      <MainContainer>div</MainContainer>
    </>
  )
}
