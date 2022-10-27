import {
  SET_PROJECT,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
  GET_ALL_PROJECT
} from '../type/type'

const stateDefault = {
  arrAllProject: null,
  arrProjectDetail: null,
  arrTasKDetail: null
}
export const projectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      state.arrAllProject = action.payload
      return { ...state }
    }
    case GET_PROJECT_DETAIL: {
      state.arrProjectDetail = action.payload
      return { ...state }
    }
    case GET_TASK_DETAIL: {
      state.arrTasKDetail = action.payload
      return { ...state }
    }
    default:
      return { ...state }
  }
}
