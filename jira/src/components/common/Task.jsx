import { styled } from '@mui/material'
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => {
  const [color, setColor] = useState(null)
  const isDragging = snapshot => {
    if (snapshot.isDragging) {
      setColor('green')
    } else {
      setColor(null)
    }
  }
  const StyledTask = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '2px',
    padding: '8px',
    marginBottom: '10px',
    backgroundColor: `${color}`
  }))
  // console.log('TASK ID:', task, task.id, index)
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <StyledTask
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          // isDragging={isDragging(snapshot)}
          // style={{
          //   backgroundColor: `${snapshot.isDragging ? 'green' : 'null'}`
          // }}
        >
          {task.content}
        </StyledTask>
      )}
    </Draggable>
  )
}

export default Task
