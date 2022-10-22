import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

const StyledContianer = styled(Box)(({ theme }) => ({
  margin: '8px',
  border: `1px solid ${theme.palette.text.secondary}`,
  width: 500,
  borderRadius: '2px',
  height: '100%'
  // backgroundColor: 'black'
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  padding: '8px'
}))

const Column = ({ tasks, column }) => {
  const [color, setColor] = useState('')
  const draggingOver = snapshot => {
    console.log('Snapshot:', snapshot)
    // if (snapshot.isDraggingOver) {
    //   setColor('skyblue')
    // }
    // else {
    //   setColor('')
    // }
  }
  const StyledContianer = styled(Box)(({ theme }) => ({
    margin: '8px',
    border: `1px solid ${theme.palette.text.secondary}`,
    width: 500,
    borderRadius: '2px',
    height: '100%'
  }))
  const StyledTaskList = styled('div')(({ theme }) => ({
    padding: ' 8px',
    // backgroundColor: `${color}`,
    flexGrow: 1
  }))

  return (
    <StyledContianer component="div">
      <StyledTitle variant="h3" color={'text.primary'}>
        {column.title}
      </StyledTitle>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <StyledTaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={draggingOver(snapshot)}
            // style={{
            //   backgroundColor: `${snapshot.isDraggingOver ? 'skyblue' : 'null'}`
            // }}
          >
            {tasks.map((item, index) => {
              return <Task key={item.id} task={item} index={index} />
            })}
            {provided.placeholder}
          </StyledTaskList>
        )}
      </Droppable>
    </StyledContianer>
  )
}

export default Column
