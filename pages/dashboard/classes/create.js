import Paper from '@mui/material/Paper'
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
import { useMutation, useQueryClient } from 'react-query'
import { createClass } from '../../../utils/api'

const defaultValues = {
  name: '',
  students: []
}

function AddClass () {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(createClassSchema)
  })

  const [formLoading, setFormLoading] = useState(false)

  const queryClient = useQueryClient()

  const createClassMutation = useMutation(data => createClass(data), {
    onMutate: () => {
      setFormLoading(true)
    },
    onSettled: () => {
      setFormLoading(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('classes')
      enqueueSnackbar('تم إضافة الفصل بنجاح', {
        variant: 'success'
      })
      router.push('/dashboard/classes')
    }
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

  const onSubmit = data => {
    createClassMutation.mutate({
      name: data.name,
      students: data.students.map(student => student.id)
    })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | إضافة فصل</title>
        </Head>
        <Container>
          <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 2 }}
          >
            <Typography variant='h3' sx={{ mb: 3, textAlign: 'center' }}>
              إضافة فصل
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
              name='students'
              control={control}
              multiple
              open={open}
              sx={{ mb: 1 }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={option => option.name}
              options={students}
              loading={loading}
              loadingText='جاري التحميل...'
              noOptionsText='لا يوجد اختيارات'
              renderInput={params => (
                <MuiTextField
                  error={Boolean(errors.students?.message)}
                  helperText={errors.students?.message}
                  {...params}
                  label='الطلاب'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
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

export default withAuth(AddClass)
