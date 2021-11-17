import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import TextField from '../../../components/TextField'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
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

const defaultValues = {
  name: '',
  guardian: null
}

function AddStudent () {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(createStudentSchema)
  })

  const [open, setOpen] = useState(false)
  const [guardians, setGuardians] = useState([])
  const [dataFetched, setDataFetched] = useState(false)
  const loading = !dataFetched && open

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  useEffect(() => {
    // let active = true

    if (!loading) {
      return undefined
    }

    API.get('/api/guardians')
      .then(({ data }) => {
        /* if (active) */ setGuardians(data.guardians)
      })
      .catch(({ response }) => {
        setGuardians([{ value: '', label: 'حدث خطأ أثناء جلب أولياء الأمور' }])
      })
      .finally(() => setDataFetched(true))

    return () => {
      // active = false
    }
  }, [loading])

  const onSubmit = (data) => {
    API.post('/api/students', {
      name: data.name,
      guardian_id: data.guardian.id
    })
      .then(response => {
        enqueueSnackbar('تم إضافة الطالب بنجاح', {
          variant: 'success'
        })
        router.push('/dashboard/students')
      })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>لوحة التحكم | إضافة طالب</title>
        </Head>
        <Container>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h3' sx={{ mb: 3 }}>إضافة طالب</Typography>
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
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              options={guardians}
              loading={loading}
              loadingText='جاري التحميل...'
              noOptionsText='لا يوجد اختيارات'
              renderInput={(params) => (
                <MuiTextField
                  error={Boolean(errors.guardian?.message)}
                  helperText={errors.guardian?.message}
                  {...params}
                  label='ولي الأمر'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color='inherit' size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
            />
            <LoadingButton type='submit' variant='contained'>إضافة</LoadingButton>
          </Box>
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AddStudent)
