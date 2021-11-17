// Middleware that requires unauthenticated user (guest)
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function withGuest (Component) {
  return (props) => {
    const router = useRouter()
    const authedUser = useSelector(state => state.authedUser)
    if (authedUser) router.push('/')
    return !authedUser && <Component {...props} />
  }
}
