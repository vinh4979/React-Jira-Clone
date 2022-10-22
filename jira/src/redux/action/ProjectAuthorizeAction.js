import { history } from 'src/App'
import { projectAuthorizeService } from 'src/service/ProjectService'
import {
  CLOSE_MODAL,
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
  NOTI_SNACK
} from '../type/type'

export const createProjectAthorizeAction = (body, navigate) => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.createProject(body)
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'Create new project successfully'
        }
      })
      navigate(-1)
      console.log(' createProjectAthorizeAction', result)
    } catch (err) {
      console.log('status action', err)
    }
  }
}

export const createTaskAction = (body, navigate) => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.createTask(body)
      console.log('create task action:', result)
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'Create task successfully'
        }
      })
      dispatch({
        type: CLOSE_MODAL
      })
    } catch (err) {
      console.log('create Task arr:', err)
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'Create task fail'
        }
      })
    }
  }
}

export const getTaskDetailAction = taskId => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.getTaskDetail(taskId)
      dispatch({
        type: GET_TASK_DETAIL,
        payload: result.data.content
      })
      console.log('get task detail action:', result)
    } catch (err) {
      console.log('get task detail action err:', err)
    }
  }
}

export const getAllProjectAction = () => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.getAllProject()
      dispatch({
        type: GET_ALL_PROJECT,
        payload: result.data.content
      })
      console.log('get all project action:', result)
    } catch (err) {
      console.log('get all project action:', err)
    }
  }
}

export const getProjectDetailAction = (idProject, navigate) => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.getProjectDetail(idProject)
      dispatch({
        type: GET_PROJECT_DETAIL,
        payload: result.data.content
      })
      if (navigate) {
        navigate(`/edit-project/${idProject}`)
      }
      console.log(' project detail action:', result)
    } catch (err) {
      console.log('project detail action:', err)
    }
  }
}

export const updateProjectAction = (body, idProject, navigate) => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.updateProject(
        body,
        idProject
      )
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'Update project success'
        }
      })
      navigate(-1)
      console.log(' update project action:', result)
    } catch (err) {
      console.log(' update project action:', err)
    }
  }
}

export const deleteProjectAction = (idProject, navigate) => {
  return async dispatch => {
    try {
      const result = await projectAuthorizeService.deleteProject(idProject)
      navigate('/')
      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'Delete project success'
        }
      })
      console.log(' delete project action:', result)
    } catch (err) {
      console.log(' delete project action:', err)
    }
  }
}

export const assignUserProjectAction = body => {
  return async dispatch => {
    try {
      console.log('assgin action', body)
      const result = await projectAuthorizeService.assignUserProject(body)

      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'assign user project success'
        }
      })
      console.log(' assign user project action:', result)
    } catch (err) {
      console.log(' assign project action:', err)
      // dispatch({
      //   type: NOTI_SNACK,
      //   payload: {
      //     open: true,
      //     type: 'waring',
      //     message: 'assign user project fail'
      //   }
      // })
    }
  }
}

export const updateTaskAction = body => {
  return async dispatch => {
    try {
      console.log('assgin action', body)
      const result = await projectAuthorizeService.updateTask(body)

      dispatch({
        type: NOTI_SNACK,
        payload: {
          open: true,
          type: 'success',
          message: 'update task success'
        }
      })
      console.log(' update task action:', result)
    } catch (err) {
      console.log(' update task success action:', err)
    }
  }
}
