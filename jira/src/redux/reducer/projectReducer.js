import produce from 'immer'
import { SET_PROJECT } from '../type/type'

const stateDefault = {
  project: null
}

export const projectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_PROJECT: {
      return produce(state, draft => {
        draft.project = action.payload
      })
    }

    default:
      return { ...state }
  }
}
