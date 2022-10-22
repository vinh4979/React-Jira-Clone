import { taskTypeService } from 'src/service/TaskTypeService'
import { GET_TASK_TYPE } from '../type/type'

export const taskTypeAction = () => {
  return async dispatch => {
    try {
      const result = await taskTypeService.getTaskType()
      dispatch({
        type: GET_TASK_TYPE,
        payload: result.data.content
      })
      console.log('task type action:', result)
    } catch (err) {
      console.log('task-type-err:', err)
    }
  }
}
