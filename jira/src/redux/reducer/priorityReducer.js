import { GET_PRIORITY } from '../type/type'
const stateDefault = {
  arrPriority: null
}

export const priorityReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PRIORITY: {
      state.arrPriority = action.payload
      return { ...state }
    }
    default:
      return { ...state }
  }
}
