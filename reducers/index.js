import { combineReducers } from 'redux'
import authedUser from './authedUser'
import loading from './loading'

export default combineReducers({
  authedUser,
  loading
})
