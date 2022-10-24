import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { stateReducer } from '../redux/reducer/stateReducer'
import { authReducer } from '../redux/reducer/authReducer'
import { projectReducer } from 'src/redux/reducer/projectReducer'
import { userReducer } from 'src/redux/reducer/userReducer'
const rootReducer = combineReducers({
  // state
  stateReducer,
  projectReducer,
  authReducer,
  userReducer
})
const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
