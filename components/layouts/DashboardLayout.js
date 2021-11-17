import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import DashboardDesktopLayout from './DashboardDesktopLayout'
import DashboardMobileLayout from './DashboardMobileLayout'

export default function DashboardLayout ({ children }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const showDesktopLayout = useMediaQuery(theme.breakpoints.up('md'))
  const Component = showDesktopLayout ? DashboardDesktopLayout : DashboardMobileLayout
  return <Component open={open} setOpen={setOpen}>{children}</Component>
}
