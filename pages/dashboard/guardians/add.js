import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import TextField from '../../../components/TextField'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import createGuardianSchema from '../../../validation-schemas/create-guardian'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import Head from 'next/head'
import API from '../../../API'
import FormHelperText from '@mui/material/FormHelperText'
import apiErrors from '../../../locales/errors/ar.json'
import { useSnackbar } from 'notistack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

const defaultValues = {
  name: '',
  username: '',
  password: '',
  password_confirmation: '',
  phone: '',
  address: ''
}

export default function AddGuardian () {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(createGuardianSchema),
    defaultValues
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data) => {
    setLoading(true)
    API.post('/api/guardians', data)
      .then(res => {
        enqueueSnackbar('تم إضافة ولي الأمر بنجاح', {
          variant: 'success'
        })
        router.push('/dashboard/guardians')
      })
      .catch(({ response }) => {
        if (response.status === 403) return setError(apiErrors[10])
        else if (response) return setError(apiErrors[response?.data?.error?.code || 1])
        setError(apiErrors[1])
      })
      .finally(() => setLoading(false))
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>لوحة التحكم | إضافة ولي أمر</title>
        </Head>
        <Container>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h3' sx={{ mb: 3 }}>إضافة ولي أمر</Typography>
            <TextField
              name='name'
              control={control}
              label='الإسم'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
            />
            <TextField
              name='username'
              control={control}
              label='إسم المستخدم'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
            />
            <TextField
              type='password'
              name='password'
              control={control}
              label='كلمة المرور'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />
            <TextField
              type='password'
              name='password_confirmation'
              control={control}
              label='تأكيد كلمة المرور'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.password_confirmation?.message)}
              helperText={errors.password_confirmation?.message}
            />
            <TextField
              name='phone'
              control={control}
              label='رقم الهاتف'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.phone?.message)}
              helperText={errors.phone?.message}
            />
            <TextField
              name='address'
              control={control}
              label='العنوان'
              fullWidth
              sx={{ mb: 1 }}
              error={Boolean(errors.address?.message)}
              helperText={errors.address?.message}
            />
            {error && <FormHelperText error={Boolean(error)} sx={{ mb: 1 }}>{error}</FormHelperText>}
            <LoadingButton type='submit' variant='contained' loading={loading}>إضافة</LoadingButton>
          </Box>
        </Container>
      </div>
    </DashboardLayout>
  )
}
