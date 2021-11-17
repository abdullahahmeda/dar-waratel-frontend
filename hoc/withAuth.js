// Middleware that requires authenticated user
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function withAuth (Component) {
  return (props) => {
    const router = useRouter()
    const authedUser = useSelector(state => state.authedUser)
    if (!authedUser) router.replace('/login')
    return authedUser && <Component {...props} />
  }
}
