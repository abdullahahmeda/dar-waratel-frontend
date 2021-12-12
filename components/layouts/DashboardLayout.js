import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import DashboardDesktopLayout from './DashboardDesktopLayout'
import DashboardMobileLayout from './DashboardMobileLayout'
import { Global } from '@emotion/react'

export default function DashboardLayout ({ children }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const showDesktopLayout = useMediaQuery(theme.breakpoints.up('md'))
  const Component = showDesktopLayout ? DashboardDesktopLayout : DashboardMobileLayout
  return (
    <>
      <Global styles={{ body: { backgroundColor: theme.palette.background.default } }} />
      <Component open={open} setOpen={setOpen}>{children}</Component>
    </>
  )
}
