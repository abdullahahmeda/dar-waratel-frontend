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
import { format } from 'date-fns'
import { useDialog } from '../../../libs/my-dialog'
import { useSnackbar } from 'notistack'

const columns = [
  {
    accessor: 'class',
    label: 'الفصل',
    Cell: ({ value }) => value.name
  },
  {
    accessor: 'session_date',
    label: 'موعد الجلسة',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd-MM-yyyy')
    }
  }
]

function SessionsIndex () {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const { openModal, closeModal } = useDialog()
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    API.get(`/api/sessions?page=0`).then(({ data }) => {
      setData(data.sessions.results)
      setCount(data.sessions.total)
      setLoading(false)
    })
  }, [])

  const deleteRow = (row, key) => {
    closeModal()
    API.delete(`/api/sessions/${row.id}`)
      .then(() => {
        const dataCopy = [...data]
        dataCopy.splice(key, 1)
        setData(dataCopy)
        enqueueSnackbar('تم حذف الجلسة بنجاح', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('حدث خطأ أثناء حذف الجلسة', { variant: 'error' })
      })
  }

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف فصل',
      text: (
        <div>
          هل أنت متأكد من رغبتك في حذف الجلسة{' '}
          <Typography sx={{ fontWeight: 'bold' }}>
            {row.class.name}(بتاريخ{' '}
            {format(new Date(row.session_date), 'dd-MM-yyyy')})؟
          </Typography>
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

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | الجلسات</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>
            الجلسات
          </Typography>
          <Link href='/dashboard/sessions/create'>
            <Button component='a' variant='contained' sx={{ mb: 1 }}>
              إضافة جلسة
            </Button>
          </Link>
          <DataTable
            data={data}
            columns={columns}
            title={
              <Typography variant='h6'>
                الجلسات
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{ marginLeft: 15, position: 'relative', top: 4 }}
                  />
                )}
              </Typography>
            }
            pagination
            actions={(row, key) => (
              <div>
                <Link href={`/dashboard/sessions/${row.id}`}>
                  <Button variant='contained' color='info' sx={{ mr: 1 }}>
                    عرض
                  </Button>
                </Link>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => confirmDeleteRow(row, key)}
                >
                  حذف
                </Button>
              </div>
            )}
          />
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(SessionsIndex)
