import { HIDE_LOADING, SHOW_LOADING } from '../actions/loading'

export default function loading (state = true, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return true
    case HIDE_LOADING:
      return false
    default:
      return state
  }
}
