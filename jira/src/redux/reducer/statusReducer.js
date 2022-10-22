import { GET_BLOG, GET_TASK_TYPE } from '../type/type'

const stateDefault = {
  arrStatus: null
}

export const statusReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_BLOG: {
      state.arrStatus = action.payload
      return { ...state }
    }

    default:
      return { ...state }
  }
}
