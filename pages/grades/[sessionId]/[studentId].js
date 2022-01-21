import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import API from '../../../API'
import MasterLayout from '../../../components/layouts/MasterLayout'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function Grades () {
  const [grades, setGrades] = useState([])

  const router = useRouter()
  const { sessionId, studentId } = router.query

  useEffect(() => {
    API.get(`/api/grades/${sessionId}/${studentId}`).then(({ data }) => {
      setGrades(data.grades)
    })
  }, [])

  return (
    <MasterLayout>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>السورة</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>النوع</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>التقييم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map(grade => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.name}</TableCell>
                  <TableCell>{grade.type}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MasterLayout>
  )
}
