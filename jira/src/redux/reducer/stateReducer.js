import {
  ASSIGN,
  CLOSE_MODAL,
  CLOSE_MODAL_EDIT_TASK,
  CLOSE_MODAL_TASK_DETAIL,
  LOADING,
  NAVIGATE,
  NOTI_SNACK,
  OPEN_MODAL,
  OPEN_MODAL_EDIT_TASK,
  OPEN_MODAL_TASK_DETAIL,
  SET_MODE
} from '../type/type'
import { ADD_USER_PROJECT } from 'src/redux/type/type'

const stateDefault = {
  isLoading: false, // loading page
  modeSystem: true, // mode theme => dark or light theme
  User: null, //User for check router
  isModalAddUserProject: false,
  idProject: '',
  notiSnack: {
    open: false,
    type: '',
    message: ''
  },
  navigate: '',
  modal: false,
  arrAssign: [],
  modalEditTask: false,
  taskId: '',
  modalTaskDetail: false
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
    case ADD_USER_PROJECT: {
      state.isModalAddUserProject = action.payload
      state.idProject = action.idProject
      return { ...state }
    }

    case NOTI_SNACK: {
      state.notiSnack.open = action.payload.open
      state.notiSnack.type = action.payload.type
      state.notiSnack.message = action.payload.message
      return { ...state }
    }

    case NAVIGATE: {
      state.navigate = action.payload
      return { ...state }
    }

    case OPEN_MODAL: {
      state.modal = true
      state.idProject = action.payload
      state.navigate = action.navigate
      return { ...state }
    }
    case CLOSE_MODAL: {
      state.modal = false
      state.idProject = ''
      return { ...state }
    }

    case ASSIGN: {
      state.arrAssign = action.payload
      return { ...state }
    }

    case OPEN_MODAL_EDIT_TASK: {
      state.modalEditTask = true
      state.taskId = action.taskId
      return { ...state }
    }
    case CLOSE_MODAL_EDIT_TASK: {
      state.modalEditTask = false
      return { ...state }
    }

    case OPEN_MODAL_TASK_DETAIL: {
      state.modalTaskDetail = true
      state.taskId = action.taskId
      return { ...state }
    }
    case CLOSE_MODAL_TASK_DETAIL: {
      state.modalTaskDetail = false
      return { ...state }
    }

    default:
      return { ...state }
  }
}
