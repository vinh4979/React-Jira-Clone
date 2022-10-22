import { GET_ALL_USER, GET_USER } from '../type/type'

const stateDefault = {
  arrUser: [],
  arrAllUser: []
}

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USER: {
      state.arrUser = action.payload
      return { ...state }
    }

    case GET_ALL_USER: {
      state.arrAllUser = action.payload
      return { ...state }
    }

    default:
      return { ...state }
  }
}
