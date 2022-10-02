import { LOADING, SET_MODE } from '../type/type'

const stateDefault = {
  isLoading: false, // loading page
  modeSystem: true, // mode theme => dark or light theme
  User: null //User for check router
}

export const stateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOADING: {
      state.isLoading = action.payLoad
      return { ...state }
    }
    case SET_MODE: {
      state.modeSystem = action.payLoad
      return { ...state }
    }
    default:
      return { ...state }
  }
}
