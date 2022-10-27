import { Box, Paper, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'
import TableProject from './TableProject'
const MainContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  // border: '1px solid red',
  height: '90vh',
  display: 'flex',
  borderRadius: '10px'
}))

const BlockTask = styled('div')(({ theme }) => ({
  flexGrow: 1,
  margin: '5px',
  overflow: 'hidden'
}))

const itemData = [
  {
    id: 0,
    title: 'Breakfast',
    author: '@bkristastucchio'
  },
  {
    id: 1,
    title: 'Burger',
    author: '@rollelflex_graphy726'
  },
  {
    id: 2,
    title: 'Camera',
    author: '@helloimnik'
  },
  {
    id: 3,
    title: 'Coffee',
    author: '@nolanissac'
  },
  {
    id: 4,
    title: 'Hats',
    author: '@hjrc33'
  },
  {
    id: 5,
    title: 'Burger',
    author: '@rollelflex_graphy726'
  },
  {
    id: 6,
    title: 'Camera',
    author: '@helloimnik'
  },
  {
    id: 7,
    title: 'Coffee',
    author: '@nolanissac'
  },
  {
    id: 8,
    title: 'Hats',
    author: '@hjrc33'
  }
]

export default function MainTask({ statusBlog }) {
  const [data, setData] = useState(itemData)

  const handleDragEnd = result => {
    if (!result.destination) return
    const items = Array.from(data)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(items)
    setData(items)
  }

  return (
    <>
      <MainContainer>div</MainContainer>
    </>
  )
}
