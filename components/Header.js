import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import API from '../API'
import { useSnackbar } from 'notistack'
import httpErrors from '../httpErrors.json'

export default function Header () {
  const authedUser = useSelector(state => state.authedUser)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const logout = () => {
    API.post('/logout')
      .then((res) => {
        dispatch(setAuthedUser(null))
      })
      .catch(({ response }) => {
        if (response) enqueueSnackbar(httpErrors[response?.data?.error?.code || 1], { variant: 'error' })
        enqueueSnackbar(httpErrors[1], { variant: 'error' })
      })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1, fontFamily: 'Markazi Text' }}>
            دار ورتل
          </Typography>
          {authedUser
            ? (
              <>
                {authedUser.type === 'guardian' && <Link href='/'><Button LinkComponent='a' color='inherit'>الرئيسية</Button></Link>}
                {authedUser.type === 'admin' && <Link href='/dashboard'><Button LinkComponent='a' color='inherit'>لوحة التحكم</Button></Link>}
                <Button onClick={logout} color='inherit'>تسجيل الخروج</Button>
              </>
              )
            : (
              <Link href='/login'><Button LinkComponent='a' color='inherit'>تسجيل الدخول</Button></Link>
              )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
