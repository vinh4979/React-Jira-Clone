import { SIGNIN_SUCCESS } from '../type/type'
import { SIGNOUT } from 'src/redux/type/type'

const stateDefault = {
  auth: null
}

export const authReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS: {
      state.auth = action.payLoad
      return { ...state }
    }
    case SIGNOUT: {
      state.auth = null
      return { ...state }
    }

    default:
      return { ...state }
  }
}
