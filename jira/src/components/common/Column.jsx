import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

const StyledContianer = styled(Box)(({ theme }) => ({
  margin: '8px',
  border: `1px solid ${theme.palette.text.secondary}`,
  width: 500,
  borderRadius: '2px',
  height: '100%',
  // backgroundColor: 'black'
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  padding: '8px'
}))

const StyledTaskList = styled('div')(({ theme }) => ({
  padding: ' 8px'
}))

const Column = ({ tasks, column }) => {
  console.log('task', tasks)
  console.log('column:', column.id)
  return (
    <StyledContianer component="div">
      <StyledTitle variant="h3" color={'text.primary'}>
        {column.title}
      </StyledTitle>
      <Droppable droppableId="droppable">
        {provided => (
          <StyledTaskList ref={provided.innerRef} {...provided.droppableProps}>
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
