import Container from '@mui/material/Container'
import { useRouter } from 'next/router'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import API from '../../../API'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import Button from '@mui/material/Button'

function Session () {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    API.get(`/api/sessions/${id}`)
      .then(({ data }) => {
        setSession(data.session)
        setLoading(false)
      })
  }, [])

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | الجلسة رقم {id}</title>
        </Head>
        <Container>
          {!loading && session ? (
            <div>
              <Box>
                <Typography component='span'>الفصل: </Typography>
                <Typography component='span' sx={{ fontWeight: 'bold' }}>{session.class.name}</Typography>
              </Box>
              <Box>
                <Typography component='span'>التاريخ: </Typography>
                <Typography component='span' sx={{ fontWeight: 'bold' }}>{session.session_date}</Typography>
              </Box>
              <Box>
                <Typography component='span'>الطلاب الذين حضروا</Typography>
                <Divider />
                {session.students.map(student => (
                  <Box display='flex' alignContent='center' justifyContent='space-between' my={2}>
                    <Typography>{student.name}</Typography>
                    <Link href={`/dashboard/grades/${session.id}/${student.id}`}><Button component='a' variant='contained'>إضافة تقييم</Button></Link>
                  </Box>
                ))}
              </Box>
            </div>
          ) : <div></div>}
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default Session
