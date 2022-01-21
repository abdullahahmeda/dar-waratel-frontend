import DashboardLayout from '../../../components/layouts/DashboardLayout'
import withAuth from '../../../hoc/withAuth'
import Head from 'next/head'
import Container from '@mui/material/Container'
import DataTable from '../../../components/DataTable'
import { useEffect, useMemo, useState } from 'react'
import API from '../../../API'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useDialog } from '../../../libs/my-dialog'
import { useSnackbar } from 'notistack'

function ClassesIndex () {
  const columns = useMemo(() => [
    {
      accessor: 'name',
      label: 'الإسم'
    }
  ])
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const { openModal, closeModal } = useDialog()
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    API.get(`/api/classes?page=0`).then(({ data }) => {
      setData(data.classes.results)
      setCount(data.classes.total)
      setLoading(false)
    })
  }, [])

  const deleteRow = (row, key) => {
    closeModal()
    API.delete(`/api/classes/${row.id}`)
      .then(() => {
        const dataCopy = [...data]
        dataCopy.splice(key, 1)
        setData(dataCopy)
        enqueueSnackbar('تم حذف الفصل بنجاح', { variant: 'success' })
      })
      .catch(() => {
        enqueueSnackbar('حدث خطأ أثناء حذف الفصل', { variant: 'error' })
      })
  }

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف فصل',
      text: (
        <div>
          هل أنت متأكد من رغبتك في حذف الفصل{' '}
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

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | الفصول</title>
        </Head>
        <Container>
          <Typography variant='h3' sx={{ mb: 3 }}>
            الفصول
          </Typography>
          <Link href='/dashboard/classes/create'>
            <Button component='a' variant='contained' sx={{ mb: 1 }}>
              إضافة فصل
            </Button>
          </Link>
          <DataTable
            data={data}
            columns={columns}
            title={
              <Typography variant='h6'>
                الفصول
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
              <Button
                variant='contained'
                color='error'
                onClick={() => confirmDeleteRow(row, key)}
              >
                حذف
              </Button>
            )}
          />
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(ClassesIndex)
