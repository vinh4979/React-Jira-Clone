import { priorityService } from 'src/service/PriorityService'
import { GET_PRIORITY } from '../type/type'

export const priorityAction = () => {
  return async dispatch => {
    try {
      const result = await priorityService.getPriority()
      dispatch({
        type: GET_PRIORITY,
        payload: result.data.content
      })
      // console.log('status action', result)
    } catch (err) {
      console.log('priority action err', err)
    }
  }
}
