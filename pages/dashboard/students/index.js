import DashboardLayout from '../../../components/layouts/DashboardLayout'
import withAuth from '../../../hoc/withAuth'
import Head from 'next/head'
import Container from '@mui/material/Container'
import DataTable from '../../../components/DataTable'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useDialog } from '../../../libs/my-dialog'
import { useSnackbar } from 'notistack'
import useStudents from '../../../hooks/useStudents'
import { useMutation, useQueryClient } from 'react-query'
import { deleteStudent } from '../../../utils/api'

const columns = [
  {
    accessor: 'name',
    label: 'الإسم'
  },
  {
    accessor: 'created_on',
    label: 'تاريخ الإضافة',
    Cell: ({ value }) => {
      const datePart = value.split('T')[0]
      const timePart = value.split('T')[1].substring(0, 8)
      return `${datePart} ${timePart}`
    }
  }
]

function StudentsIndex () {
  const {
    error: studentsError,
    isLoading: studentsLoading,
    data: studentsData
  } = useStudents()

  const queryClient = useQueryClient()

  const deleteStudentMutation = useMutation(id => deleteStudent(id), {
    onMutate: async id => {
      await queryClient.cancelQueries('students')
      const oldStudentsData = queryClient.getQueryData('students')
      const newStudentsData = { ...oldStudentsData }
      newStudentsData.results = oldStudentsData.results.filter(
        student => student.id !== id
      )
      newStudentsData.total--
      queryClient.setQueryData('students', newStudentsData)

      return { oldStudentsData }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData('students', context.oldStudentsData)
      enqueueSnackbar(`فشل حذف الطالب رقم ${id}`, { variant: 'error' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries('students')
    }
  })

  const { openModal, closeModal } = useDialog()
  const { enqueueSnackbar } = useSnackbar()

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف طالب',
      text: (
        <div>
          هل أنت متأكد من رغبتك في حذف الطالب{' '}
          <Typography sx={{ fontWeight: 'bold' }}>{row.name}؟</Typography>
        </div>
      ),
      actions: (
        <>
          <Button onClick={closeModal}>تراجع</Button>
          <Button onClick={() => deleteRow(row, key)}>حذف</Button>
        </>
      )
    })
  }

  const deleteRow = (row, key) => {
    closeModal()
    deleteStudentMutation.mutate(row.id)
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | الطلاب</title>
        </Head>
        <Container sx={{ my: 2 }}>
          <Typography variant='h3' sx={{ mb: 3 }}>
            الطلاب
          </Typography>
          <Link href='/dashboard/students/create'>
            <Button component='a' variant='contained' sx={{ mb: 1 }}>
              إضافة طالب
            </Button>
          </Link>
          {!studentsLoading && (
            <DataTable
              data={studentsData.results}
              columns={columns}
              title={
                <Typography variant='h6'>
                  الطلاب
                  {studentsLoading && (
                    <CircularProgress
                      size={24}
                      sx={{ marginLeft: 15, position: 'relative', top: 4 }}
                    />
                  )}
                </Typography>
              }
              pagination
              actions={(row, key) => (
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => confirmDeleteRow(row, key)}
                >
                  حذف
                </Button>
              )}
            />
          )}
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(StudentsIndex)
