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
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    API.get(`/api/guardians?page=0`)
      .then(({ data }) => {
        setData(data.guardians.results)
        setCount(data.guardians.total)
        setLoading(false)
      })
  }, [])

  const confirmDeleteRow = () => {
    
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
