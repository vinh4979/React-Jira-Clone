import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { stateReducer } from '../redux/reducer/stateReducer'
import { authReducer } from '../redux/reducer/authReducer'
import { caseDataReducer } from '../redux/reducer/caseDataReducer'
import { projectCategoryReducer } from '../redux/reducer/projectCategoryReducer'
import { projectReducer } from '../redux/reducer/projectReducer'
import { userReducer } from '../redux/reducer/userReducer'
import { taskTypeReducer } from '../redux/reducer/TaskTypeReducer'
import { priorityReducer } from '../redux/reducer/priorityReducer'
import { statusReducer } from '../redux/reducer/statusReducer'

const rootReducer = combineReducers({
  // state
  stateReducer,
  authReducer,
  caseDataReducer,
  projectCategoryReducer,
  projectReducer,
  userReducer,
  taskTypeReducer,
  priorityReducer,
  statusReducer
})
const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
