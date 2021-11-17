import Box from '@mui/material/Box'
import { useFieldArray, useForm } from 'react-hook-form'
import Head from 'next/head'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import DatePicker from '../../../components/DatePicker'
import Container from '@mui/material/Container'
import { Fragment, useEffect, useState } from 'react'
import API from '../../../API'
import withAuth from '../../../hoc/withAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import MuiTextField from '@mui/material/TextField'
import TextField from '../../../components/TextField'
import createGradeSchema from '../../../validation-schemas/create-grade'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

const defaultValues = {
  grades: [{ name: '', type: '', grade: '' }]
}

function AddGrade () {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(createGradeSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'grades'
  })

  const onSubmit = (data) => {
    API.post('/api/grades', {
      grades: data.grades,
      session_student_id: 2
    })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | إضافة درجات</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>إضافة درجات</Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} sx={{ mb: 1 }} rowSpacing={1}>
              {fields.map((field, index) => (
                <Grid key={field.id} container item spacing={1}>
                  <Grid item xs>
                    <TextField
                      name={`grades.${index}.name`}
                      control={control}
                      label='الورد (السورة والآيات)'
                      fullWidth
                      error={Boolean(errors.grades && errors.grades[index]?.name?.message)}
                      helperText={errors.grades && errors.grades[index]?.name?.message}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name={`grades.${index}.type`}
                      control={control}
                      label='نوع الحفظ'
                      fullWidth
                      error={Boolean(errors.grades && errors.grades[index]?.type?.message)}
                      helperText={errors.grades && errors.grades[index]?.type?.message}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name={`grades.${index}.grade`}
                      control={control}
                      label='التقييم'
                      fullWidth
                      error={Boolean(errors.grades && errors.grades[index]?.grade?.message)}
                      helperText={errors.grades && errors.grades[index]?.grade?.message}
                    />
                  </Grid>
                  <Grid item sx={{ marginTop: 1 }}>
                    <IconButton color='error' disabled={fields.length === 1} onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton type='button' variant='contained' color='secondary' onClick={() => append({ name: '', type: '', grade: '' })}>إضافة تقييم آخر</LoadingButton>
            </Box>
            <LoadingButton type='submit' variant='contained'>إضافة</LoadingButton>
          </Box>
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AddGrade)
