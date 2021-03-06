import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useFieldArray, useForm } from 'react-hook-form'
import Head from 'next/head'
import DashboardLayout from '../../../../components/layouts/DashboardLayout'
import DatePicker from '../../../../components/DatePicker'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import API from '../../../../API'
import withAuth from '../../../../hoc/withAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '../../../../components/TextField'
import createGradeSchema from '../../../../validation-schemas/create-grade'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const defaultValues = {
  grades: [{ name: '', type: '', grade: '' }]
}

function Grades () {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(createGradeSchema)
  })

  const [loading, setLoading] = useState(true)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'grades',
    keyName: '_id'
  })

  const router = useRouter()
  const { sessionId, studentId } = router.query

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    API.get(`/api/grades/${sessionId}/${studentId}`)
      .then(({ data }) => {
        setValue(
          'grades',
          data.grades.concat([{ name: '', type: '', grade: '' }])
        )
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const onSubmit = data => {
    API.post('/api/grades', {
      grades: data.grades,
      session_id: sessionId,
      student_id: studentId
    }).then(({ data }) => {
      enqueueSnackbar('???? ?????????? ??????????????', { variant: 'success' })
    })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>?????? ???????? | ?????????? ??????????</title>
        </Head>
        <Container>
          <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 2, ...(loading && { backgroundColor: '#f2f2f2' }) }}
          >
            {loading ? (
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress color='inherit' />
              </Box>
            ) : (
              <>
                <Typography variant='h3' sx={{ mb: 3, textAlign: 'center' }}>
                  ?????????? ??????????
                </Typography>
                <Grid container spacing={1} sx={{ mb: 1 }} rowSpacing={1}>
                  {fields.map((field, index) => (
                    <Grid key={field._id} container item spacing={1}>
                      <Grid item xs>
                        <TextField
                          name={`grades.${index}.name`}
                          control={control}
                          label='?????????? (???????????? ??????????????)'
                          fullWidth
                          error={Boolean(
                            errors.grades && errors.grades[index]?.name?.message
                          )}
                          helperText={
                            errors.grades && errors.grades[index]?.name?.message
                          }
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          name={`grades.${index}.type`}
                          control={control}
                          label='?????? ??????????'
                          fullWidth
                          error={Boolean(
                            errors.grades && errors.grades[index]?.type?.message
                          )}
                          helperText={
                            errors.grades && errors.grades[index]?.type?.message
                          }
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          name={`grades.${index}.grade`}
                          control={control}
                          label='??????????????'
                          fullWidth
                          error={Boolean(
                            errors.grades &&
                              errors.grades[index]?.grade?.message
                          )}
                          helperText={
                            errors.grades &&
                            errors.grades[index]?.grade?.message
                          }
                        />
                      </Grid>
                      <Grid item sx={{ marginTop: 1 }}>
                        <IconButton
                          color='error'
                          disabled={fields.length === 1}
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton
                    type='button'
                    variant='contained'
                    color='secondary'
                    onClick={() => append({ name: '', type: '', grade: '' })}
                  >
                    ?????????? ?????????? ??????
                  </LoadingButton>
                </Box>
                <LoadingButton type='submit' variant='contained'>
                  ??????
                </LoadingButton>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(Grades)
