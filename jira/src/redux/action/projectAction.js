// import { ProjectAuthorizeService } from 'src/service/ProjectService'
// import { GET_ALL_PROJECT, SET_PROJECT } from '../type/type'

// export const fetchProjectAction = () => {
//   return async dispatch => {
//     try {
//       const res = await ProjectAuthorizeService.getAllProject()
//       dispatch({
//         type: GET_ALL_PROJECT,
//         payload: res.data.content
//       })
//     } catch (error) {
//       console.log('error', error)
//     }
//   }
// }

// export const fetchDeleteAction = id => {
//   return async dispatch => {
//     try {
//       const res = await ProjectAuthorizeService.deleteProject(id)
//       dispatch({
//         type: SET_PROJECT,
//         payload: res.data.content
//       })
//     } catch (error) {
//       console.log('error', error)
//     }
//   }
// }
