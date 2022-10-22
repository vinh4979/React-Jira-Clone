import { GET_BLOG } from '../type/type'

const stateDefault = {
  statusBlog: null
}

export const caseDataReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_BLOG: {
      state.statusBlog = action.payload
      return { ...state }
    }
    default:
      return { ...state }
  }
}
