import { styled } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const StyledTask = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: '2px',
  padding: '8px',
  marginBottom: '10px'
}))
const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <StyledTask
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {task.content}
        </StyledTask>
      )}
    </Draggable>
  )
}

export default Task
