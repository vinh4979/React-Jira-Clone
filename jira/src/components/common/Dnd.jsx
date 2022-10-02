import React from 'react'
import initialData from 'src/utils/initialData'
import Column from './Column'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'

const Dnd = () => {
  const state = initialData

  const handleOnDraEnd = result => {
    //To do reoder our column
  }
  return (
    <DragDropContext onDragEnd={handleOnDraEnd}>
      {state.columnOder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskid => state.tasks[taskid])
        return <Column key={column.id} tasks={tasks} column={column} />
      })}
    </DragDropContext>
  )
}

export default Dnd
