import { TOKEN } from 'src/config/configApi'
import { USER_ACCOUNT } from 'src/config/configLocalStorage'
import { userService } from 'src/service/UserService'
import { GET_USER, LOADING, SIGNIN_SUCCESS } from '../type/type'

export const signUpAction = body => {
  return async dispatch => {
    try {
      const result = await userService.signup(body)
      const body1 = {
        email: result.data.content.email,
        password: result.data.content.passWord
      }
      dispatch(signInAction(body1))
      dispatch({
        type: LOADING,
        payLoad: false
      })
    } catch (err) {
      dispatch({
        type: LOADING,
        payLoad: false
      })
      console.log('sign-up error:', err)
    }
  }
}

export const signInAction = body => {
  return async dispatch => {
    try {
      const result = await userService.signin(body)
      localStorage.setItem(USER_ACCOUNT, JSON.stringify(result.data.content))
      localStorage.setItem(TOKEN, result.data.content.accessToken)
      dispatch({
        type: SIGNIN_SUCCESS,
        payLoad: result.data.content
      })
      // dispatch({
      //   type: LOADING,
      //   payLoad: false
      // })

      console.log('sign-in', result)
    } catch (err) {
      console.log('sign-in-err:', err)
    }
  }
}

export const getUserAction = (key = '') => {
  return async dispatch => {
    try {
      const result = await userService.getUser(key)
      dispatch({
        type: GET_USER,
        payLoad: result.data.content
      })
    } catch (err) {
      console.log('sign-in-err:', err)
    }
  }
}
