import { styled } from '@mui/material'
import React from 'react'
import TableProject from './TableProject'

const MainContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  border: '1px solid red',
  height: '90vh'
}))

export default function MainTask() {
  return (
    <>
      <MainContainer>
        <TableProject />
      </MainContainer>
    </>
  )
}
