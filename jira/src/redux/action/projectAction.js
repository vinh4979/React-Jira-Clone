import { projectService } from 'src/service/ProjectService'
import { SET_PROJECT } from '../type/type'

export const fetchProjectAction = (key = '') => {
  return async dispatch => {
    try {
      const res = await projectService.getProject(key)
      dispatch({
        type: SET_PROJECT,
        payload: res.data.content
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const fetchDeleteAction = id => {
  return async dispatch => {
    try {
      const res = await projectService.deleteProject(id)
      dispatch({
        type: SET_PROJECT,
        payload: res.data.content
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}
