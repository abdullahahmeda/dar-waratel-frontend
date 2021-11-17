import API from '../API'
import { setAuthedUser } from './authedUser'
import { hideLoading, showLoading } from './loading'

export function getInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    Promise.all([
      API.get('/csrf'),
      API.get('/me')
    ])
      .then(([_, response]) => {
        dispatch(setAuthedUser(response.data.user))
        dispatch(hideLoading())
      })
      .catch(err => {
        dispatch(hideLoading())
        console.log(err)
      })
  }
}
