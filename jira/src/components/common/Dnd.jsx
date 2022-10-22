import React from 'react'
import initialData from 'src/utils/initialData'
import Column from './Column'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState } from 'react'
import { styled } from '@mui/material'

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '70vh'
}))

const Dnd = () => {
  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    setState(newState)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledContainer>
        {state.columnOder.map(columnId => {
          const column = state.columns[columnId]
          const tasks = column.taskIds.map(taskid => state.tasks[taskid])
          return <Column key={column.id} tasks={tasks} column={column} />
        })}
      </StyledContainer>
    </DragDropContext>
  )
}

export default Dnd
