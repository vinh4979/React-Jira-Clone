import { GET_PROJECT_CATEGORY } from '../type/type'

const stateDefault = {
  projectCategory: null
}

export const projectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT_CATEGORY: {
      state.projectCategory = action.payload
      return { ...state }
    }
    default:
      return { ...state }
  }
}
