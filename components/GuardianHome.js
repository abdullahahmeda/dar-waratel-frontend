import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../API'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActionArea from '@mui/material/CardActionArea'

export default function GuardianHome () {
  const authedUser = useSelector(state => state.authedUser)
  const [students, setStudents] = useState([])

  useEffect(() => {
    API.get(`/api/students?guardian_id=${authedUser.id}`)
      .then(({ data }) => {
        setStudents(data.students)
      })
  }, [])

  return (
    <Container>
      <Typography variant='h3' mb={2}>الطلاب</Typography>
      {students ? (
        <Grid container spacing={2}>
          {students.map(student => (
            <Grid item key={student.id}>
              <Card component='div'>
                <Link href={`/students/${student.id}`}>
                  <CardActionArea>
                    <CardContent>
                      <Box sx={{ textAlign: 'center' }}>
                        <AccountCircleIcon fontSize='large' />
                      </Box>
                      <Typography>{student.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : <Typography>لا يوجد طلاب</Typography>}
    </Container>
  )
}
