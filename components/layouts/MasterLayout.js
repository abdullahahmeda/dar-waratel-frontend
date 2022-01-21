import Header from '../Header'
import Box from '@mui/material/Box'

export default function MasterLayout ({ children }) {
  return (
    <>
      <Header />
      <Box sx={{ mt: 2 }}>{children}</Box>
    </>
  )
}
