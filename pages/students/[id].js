import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MasterLayout from '../../components/layouts/MasterLayout'
import API from '../../API'
import { useRouter } from 'next/router'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { format } from 'date-fns'

export default function Student () {
  const authedUser = useSelector(state => state.authedUser)
  const [student, setStudent] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    API.get(`/api/students/${id}`)
      .then(({ data }) => {
        setStudent(data.student)
        API.get(`/api/sessions?student_id=${id}`)
          .then(({ data }) => {
            setSessions(data.sessions)
          })
          .finally(() => setLoading(false))
      })
  }, [])

  return (
    <MasterLayout>
      {loading ? (
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </>
      ) : (
        <Container>
          <Typography variant='h3' mb={2}>متابعة مستوى الطالب</Typography>
          <Typography>إسم الطالب: {student.name}</Typography>
          <Typography variant='h5'>الجلسات التي حضرها الطالب</Typography>
          <Divider sx={{ mb: 2, mt: 1 }} />
          {sessions.map(session => <Link href={`/grades/${session.id}/${student.id}`}><Button LinkComponent='a'>{session.class.name} (بتاريخ يوم {format(new Date(session.session_date), 'dd-MM-yyyy')})</Button></Link>)}
        </Container>
      )}
    </MasterLayout>
  )
}
