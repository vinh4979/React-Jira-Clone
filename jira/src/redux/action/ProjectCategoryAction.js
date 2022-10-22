import { projectCategoryService } from 'src/service/ProjectCategoryService'
import { GET_PROJECT_CATEGORY } from '../type/type'

export const ProjectCategoryAction = () => {
  return async dispatch => {
    try {
      const result = await projectCategoryService.getProjectCategory()

      dispatch({
        type: GET_PROJECT_CATEGORY,
        payload: result.data.content
      })
      console.log('project category action:', result)
    } catch (err) {
      console.log('project category action:', err)
    }
  }
}
