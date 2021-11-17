import { ThemeProvider } from '@mui/material/styles'
import Rtl from '../components/RTL'
import '../styles/globals.css'
import theme from '../theme'
import { Provider } from 'react-redux'
import store from '../store'
import AppWrapper from '../components/AppWrapper'
import { SnackbarProvider } from 'notistack'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DialogProvider } from '../libs/my-dialog'

export default function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <AppWrapper>
          <ThemeProvider theme={theme}>
            <Rtl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SnackbarProvider>
                  <DialogProvider>
                    <Component {...pageProps} />
                  </DialogProvider>
                </SnackbarProvider>
              </LocalizationProvider>
            </Rtl>
          </ThemeProvider>
        </AppWrapper>
    </Provider>
  )
}
