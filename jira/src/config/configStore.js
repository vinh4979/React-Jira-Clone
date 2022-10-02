import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { stateReducer } from '../redux/reducer/stateReducer'
import { authReducer } from '../redux/reducer/authReducer'

const rootReducer = combineReducers({
  // state
  stateReducer,
  authReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
