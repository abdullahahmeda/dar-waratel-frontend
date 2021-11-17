import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import DrawerContent from '../DrawerContent'
import AppBarContent from '../AppBarContent'

const fullDrawerWidth = 240

export default function DashboardMobileLayout ({ open, setOpen, children }) {
  // const theme = useTheme()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <AppBarContent open={open} setOpen={setOpen} />
        </AppBar>
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: fullDrawerWidth }}>
          <DrawerContent />
        </Box>
      </Drawer>
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </>
  )
}
