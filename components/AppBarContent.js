import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import API from '../API'
import { useSnackbar } from 'notistack'
import httpErrors from '../httpErrors.json'
import { setAuthedUser } from '../actions/authedUser'
import { useDispatch } from 'react-redux'

export default function AppBarContent ({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

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
    <Toolbar>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        لوحة التحكم
      </Typography>
      <Button color='inherit' onClick={logout}>تسجيل الخروج</Button>
    </Toolbar>
  )
}