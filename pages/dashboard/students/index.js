import DashboardLayout from '../../../components/layouts/DashboardLayout'
import withAuth from '../../../hoc/withAuth'
import Head from 'next/head'
import Container from '@mui/material/Container'
import DataTable from '../../../components/DataTable'
import { useEffect, useState } from 'react'
import API from '../../../API'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useDialog } from '../../../libs/my-dialog'
import { useSnackbar } from 'notistack'

const columns = [
  {
    accessor: 'name',
    label: 'الإسم'
  }
]

function StudentsIndex () {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(1)
  const { openModal, closeModal } = useDialog()
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    API.get(`/api/students?page=0`)
      .then(({ data }) => {
        setData(data.students.results)
        setCount(data.students.total)
        setLoading(false)
      })
  }, [])

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف طالب',
      text: <div>هل أنت متأكد من رغبتك في حذف الطالب <Typography sx={{ fontWeight: 'bold' }}>{row.name}؟</Typography></div>,
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
    API.delete(`/api/students/${row.id}`)
      .then(() => {
        const dataCopy = [...data]
        dataCopy.splice(key, 1)
        setData(dataCopy)
        enqueueSnackbar('تم حذف الطالب بنجاح', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('حدث خطأ أثناء حذف الطالب', { variant: 'error' })
      })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | الطلاب</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>الطلاب</Typography>
          <Link href='/dashboard/students/add'><Button component='a' variant='contained' sx={{ mb: 1 }}>إضافة طالب</Button></Link>
          <DataTable
            data={data}
            columns={columns}
            title={
              <Typography variant='h6'>
                الطلاب
                {loading && <CircularProgress size={24} sx={{ marginLeft: 15, position: 'relative', top: 4 }} />}
              </Typography>
            }
            pagination
            actions={(row, key) => <Button variant='contained' color='error' onClick={() => confirmDeleteRow(row, key)}>حذف</Button>}
          />
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(StudentsIndex)
