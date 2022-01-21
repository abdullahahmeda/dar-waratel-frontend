import Paper from '@mui/material/Paper'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import TextField from '../../../components/TextField'
import Container from '@mui/material/Container'
import { useState } from 'react'
import API from '../../../API'
import withAuth from '../../../hoc/withAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import MuiTextField from '@mui/material/TextField'
import Autocomplete from '../../../components/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import createStudentSchema from '../../../validation-schemas/create-student'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import useGuardians from '../../../hooks/useGuardians'
import { useMutation, useQueryClient } from 'react-query'
import { createStudent } from '../../../utils/api'

const defaultValues = {
  name: '',
  guardian: null
}

function AddStudent () {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(createStudentSchema)
  })

  const queryClient = useQueryClient()

  const {
    error: guardiansError,
    isLoading: guardiansLoading,
    data: guardiansData
  } = useGuardians()

  const createStudentMutation = useMutation(data => createStudent(data), {
    onMutate: () => {
      setFormLoading(true)
    },
    onSettled: () => {
      setFormLoading(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('students')
      enqueueSnackbar('تم إضافة الطالب بنجاح', {
        variant: 'success'
      })
      router.push('/dashboard/students')
    }
  })

  const [formLoading, setFormLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const onSubmit = data => {
    createStudentMutation.mutate({
      name: data.name,
      guardian_id: data.guardian.id
    })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>لوحة التحكم | إضافة طالب</title>
        </Head>
        <Container>
          <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 2 }}
          >
            <Typography variant='h3' sx={{ mb: 3, textAlign: 'center' }}>
              إضافة طالب
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
            <Autocomplete
              name='guardian'
              control={control}
              open={open}
              sx={{ mb: 1 }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={option => option.name}
              options={guardiansData?.results || []}
              loading={guardiansLoading}
              loadingText='جاري التحميل...'
              noOptionsText='لا يوجد اختيارات'
              renderInput={params => (
                <MuiTextField
                  error={Boolean(errors.guardian?.message)}
                  helperText={errors.guardian?.message}
                  {...params}
                  label='ولي الأمر'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {guardiansLoading ? (
                          <CircularProgress color='inherit' size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
            />
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

export default withAuth(AddStudent)
