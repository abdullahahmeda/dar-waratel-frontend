import Head from 'next/head'
import { Global } from '@emotion/react'
import Paper from '@mui/material/Paper'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import Container from '@mui/material/Container'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import loginSchema from '../validation-schemas/login'
import TextField from '../components/TextField'
import RadioGroup from '../components/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import { useState } from 'react'
import API from '../API'
import Typography from '@mui/material/Typography'
import httpErrors from '../httpErrors.json'
import withGuest from '../hoc/withGuest'
import MasterLayout from '../components/layouts/MasterLayout'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { useTheme } from '@mui/material/styles'

const defaultValues = {
  username: '',
  password: '',
  type: ''
}

function Login () {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues
  })

  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const onSubmit = (data) => {
    setLoading(true)
    API.post('/login', data)
      .then(({ data }) => {
        enqueueSnackbar(`مرحبا بعودتك، ${data.user.username}`, {
          variant: 'success'
        })
        dispatch(setAuthedUser(data.user))
        router.push('/')
      })
      .catch(({ response }) => {
        if (response.status === 403) return setError(httpErrors[10])
        else if (response) return setError(httpErrors[response?.data?.error?.code || 1])
        setError(httpErrors[1])
      })
      .finally(() => setLoading(false))
  }

  return (
    <MasterLayout>
      <div>
        <Global
          styles={{
            body: {
              backgroundColor: theme.palette.background.default
            }
          }}
        />
        <Head>
          <title>دار ورتل | تسجيل الدخول</title>
        </Head>
        <Container>
          <Paper component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4, maxWidth: '25rem', mx: 'auto', p: 2 }} bgcolor='#fff'>
            <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>تسجيل الدخول</Typography>
            <TextField
              name='username'
              control={control}
              label='إسم المستخدم'
              sx={{ mb: 1 }}
              fullWidth
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
            />
            <TextField
              type='password'
              name='password'
              control={control}
              label='كلمة المرور'
              sx={{ mb: 1 }}
              fullWidth
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />
            <FormControl component='fieldset' sx={{ mb: 1 }} error={Boolean(errors.type?.message)}>
              <FormLabel component='legend'>تسجيل الدخول كـ</FormLabel>
              <RadioGroup row name='type' control={control}>
                <FormControlLabel value='guardian' control={<Radio />} label='ولي أمر' />
                <FormControlLabel value='admin' control={<Radio />} label='أدمن' />
              </RadioGroup>
              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
            {error && <FormHelperText error={Boolean(error)} sx={{ mb: 1 }}>{error}</FormHelperText>}
            <LoadingButton type='submit' loading={loading} variant='contained' fullWidth size='large'>تسجيل الدخول</LoadingButton>
          </Paper>
        </Container>
      </div>
    </MasterLayout>
  )
}

export default withGuest(Login)
