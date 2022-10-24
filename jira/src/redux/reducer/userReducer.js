import produce from 'immer'
import { GET_USER } from '../type/type'

const stateDefault = {
  User: null
}

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    // case GET_USER: {
    //   return produce(state, draft => {
    //     draft.User = action.payload
    //   })
    // }
    case GET_USER: {
      state.User = action.payLoad
      return { ...state }
    }

    default:
      return { ...state }
  }
}
