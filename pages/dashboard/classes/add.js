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
import createClassSchema from '../../../validation-schemas/create-class'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const defaultValues = {
  name: '',
  students: []
}

function AddClass () {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(createClassSchema)
  })

  const [open, setOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [dataFetched, setDataFetched] = useState(false)
  const loading = !dataFetched && open

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    API.get('/api/students')
      .then(({ data }) => {
        setStudents(data.students)
      })
      .catch(({ response }) => {
        setStudents([{ value: '', label: 'حدث خطأ أثناء جلب أولياء الأمور' }])
      })
      .finally(() => {
        setDataFetched(true)
      })
  }, [loading])

  const onSubmit = (data) => {
    API.post('/api/classes', {
      name: data.name,
      students: data.students.map(student => student.id)
    })
      .then(response => {
        enqueueSnackbar('تم إضافة الفصل بنجاح', {
          variant: 'success'
        })
        router.push('/dashboard/classes')
      })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | إضافة فصل</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>إضافة فصل</Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
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
              name='students'
              control={control}
              multiple
              open={open}
              sx={{ mb: 1 }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              options={students}
              loading={loading}
              loadingText='جاري التحميل...'
              noOptionsText='لا يوجد اختيارات'
              renderInput={(params) => (
                <MuiTextField
                  error={Boolean(errors.students?.message)}
                  helperText={errors.students?.message}
                  {...params}
                  label='الطلاب'
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

export default withAuth(AddClass)
