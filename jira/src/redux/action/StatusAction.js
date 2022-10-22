import { statusService } from 'src/service/StatusService'
import { GET_BLOG } from '../type/type'

export const statusAction = () => {
  return async dispatch => {
    try {
      const result = await statusService.getBlockStatus()
      dispatch({
        type: GET_BLOG,
        payload: result.data.content
      })
      // console.log('status action', result)
    } catch (err) {
      console.log('status action', err)
    }
  }
}

export const updateStatusAction = body => {
  return async dispatch => {
    try {
      const result = await statusService.updateStatus(body)

      console.log('update status action', result)
    } catch (err) {
      console.log('update status action', err)
    }
  }
}
