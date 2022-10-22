import { GET_TASK_TYPE } from '../type/type'

const stateDefault = {
  arrTaskType: null
}

export const taskTypeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_TASK_TYPE: {
      state.arrTaskType = action.payload
      return { ...state }
    }

    default:
      return { ...state }
  }
}
