import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import DatePicker from '../../../components/DatePicker'
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
import { formatISO } from 'date-fns'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const defaultValues = {
  session_date: null,
  class: null,
  students: []
}

function AddSession () {
  const { control, setValue, getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    // resolver: yupResolver(createClassSchema)
  })

  const [classesOpen, setClassesOpen] = useState(false)
  const [studentsOpen, setStudentsOpen] = useState(false)
  const [classes, setClasses] = useState([])
  const [students, setStudents] = useState([])
  const [classesFetched, setClassesFetched] = useState(false)
  const [studentsFetched, setStudentsFetched] = useState(false)
  const classesLoading = !classesFetched && classesOpen
  const studentsLoading = !studentsFetched && studentsOpen

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  useEffect(() => {
    // let active = true

    if (!classesLoading) {
      return undefined
    }

    API.get('/api/classes')
      .then(({ data }) => {
        /*if (active)*/ setClasses(data.classes)
      })
      .catch(({ response }) => {
        setClasses([{ value: '', label: 'حدث خطأ أثناء جلب أولياء الأمور' }])
      })
      .finally(() => setClassesFetched(true))

    return () => {
      // active = false
    }
  }, [classesLoading])

  useEffect(() => {
    setStudents([])
    setStudentsFetched(false)
  }, [getValues('class.id')])

  useEffect(() => {
    // let active = true
    if (!studentsLoading) {
      return undefined
    }

    API.get(`/api/students?class_id=${getValues('class.id')}`)
      .then(({ data }) => {
        /*if (active)*/ setStudents(data.students)
      })
      .catch(({ response }) => {
        setStudents([{ value: '', label: 'حدث خطأ أثناء جلب أولياء الأمور' }])
      })
      .finally(() => setStudentsFetched(true))

    return () => {
      // active = false
    }
  }, [studentsLoading])

  const onSubmit = (data) => {
    console.log(data)
    API.post('/api/sessions', {
      session_date: formatISO(data.session_date, { representation: 'date' }),
      class_id: data.class.id,
      students: data.students.map(student => student.id)
    })
      .then(response => {
        enqueueSnackbar('تم إضافة الجلسة بنجاح', {
          variant: 'success'
        })
        router.push('/dashboard/sessions')
      })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | إضافة جلسة</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>إضافة جلسة</Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <DatePicker
              name='session_date'
              control={control}
              label='موعد الجلسة'
              renderInput={(params) => (
              <MuiTextField
                {...params}
                fullWidth
                sx={{ mb: 1 }}
                error={Boolean(errors.session_date?.message)}
                helperText={errors.session_date?.message}
              />)}
            />
            <Autocomplete
              name='class'
              control={control}
              open={classesOpen}
              sx={{ mb: 1 }}
              onOpen={() => setClassesOpen(true)}
              onClose={() => setClassesOpen(false)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component='li' {...props} key={option.id}>
                  {option.name}
                </Box>
              )}
              options={classes}
              loading={classesLoading}
              renderInput={(params) => (
                <MuiTextField
                  error={Boolean(errors.classes?.message)}
                  helperText={errors.classes?.message}
                  {...params}
                  label='الفصل'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {classesLoading ? <CircularProgress color='inherit' size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
            />
            <Autocomplete
              name='students'
              control={control}
              multiple
              open={studentsOpen}
              sx={{ mb: 1 }}
              onOpen={() => setStudentsOpen(true)}
              onClose={() => setStudentsOpen(false)}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              options={students}
              loading={studentsLoading}
              renderInput={(params) => (
                <MuiTextField
                  error={Boolean(errors.students?.message)}
                  helperText={errors.students?.message}
                  {...params}
                  label='الطلاب الذين حضروا'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {studentsLoading ? <CircularProgress color='inherit' size={20} /> : null}
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

export default withAuth(AddSession)
