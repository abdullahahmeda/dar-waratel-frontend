import { useState } from 'react'
import Paper from '@mui/material/Paper'
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
import httpErrors from '../../../httpErrors.json'
import { useSnackbar } from 'notistack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useQueryClient, useMutation } from 'react-query'
import { createGuardian } from '../../../utils/api'

const defaultValues = {
  name: '',
  username: '',
  password: '',
  password_confirmation: '',
  phone: '',
  address: ''
}

export default function AddGuardian () {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createGuardianSchema),
    defaultValues
  })

  const queryClient = useQueryClient()

  const [formLoading, setFormLoading] = useState(false)

  const createGuardianMutation = useMutation(data => createGuardian(data), {
    onMutate: () => {
      setFormLoading(true)
    },
    onSettled: () => {
      setFormLoading(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('guardians')
      enqueueSnackbar('تم إضافة ولي الأمر بنجاح', {
        variant: 'success'
      })
      router.push('/dashboard/guardians')
    }
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = data => {
    createGuardianMutation.mutate(data)
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>لوحة التحكم | إضافة ولي أمر</title>
        </Head>
        <Container>
          <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 2 }}
          >
            <Typography variant='h3' sx={{ mb: 3, textAlign: 'center' }}>
              إضافة ولي أمر
            </Typography>
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
            {error && (
              <FormHelperText error={Boolean(error)} sx={{ mb: 1 }}>
                {error}
              </FormHelperText>
            )}
            <LoadingButton
              type='submit'
              variant='contained'
              loading={formLoading}
            >
              إضافة
            </LoadingButton>
          </Paper>
        </Container>
      </div>
    </DashboardLayout>
  )
}
