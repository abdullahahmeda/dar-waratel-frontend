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
  },
  {
    accessor: 'username',
    label: 'إسم المستخدم'
  },
  {
    accessor: 'phone',
    label: 'رقم الهاتف'
  }
]

function GuardiansIndex () {
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const { openModal, closeModal } = useDialog()

  useEffect(() => {
    API.get(`/api/guardians`)
      .then(({ data }) => {
        setData(data.guardians)
        setCount(data.guardians.length)
        // setTimeout(() => setLoading(false), 5000)
        setLoading(false)
      })
  }, [])

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف ولي أمر',
      text: <div>هل أنت متأكد من رغبتك في حذف ولي الأمر <Typography sx={{ fontWeight: 'bold' }}>{row.name}؟</Typography></div>,
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
    API.delete(`/api/guardians/${row.id}`)
      .then(() => {
        const dataCopy = [...data]
        dataCopy.splice(key, 1)
        setData(dataCopy)
        enqueueSnackbar('تم حذف ولي الأمر بنجاح', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('حدث خطأ أثناء حذف ولي الأمر', { variant: 'error' })
      })
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | أولياء الأمور</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>أولياء الأمور</Typography>
          <Link href='/dashboard/guardians/add'><Button component='a' variant='contained' sx={{ mb: 1 }}>إضافة ولي أمر</Button></Link>
          <DataTable
            data={data}
            columns={columns}
            title={
              <Typography variant='h6'>
                أولياء الأمور
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

export default withAuth(GuardiansIndex)
