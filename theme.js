import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Almarai, cursive'
  },
  palette: {
    primary: {
      main: '#009DAE'
    },
    secondary: {
      main: '#ffdd14'
    },
    background: {
      default: '#f9feff'
    }
  }
})

export default theme
