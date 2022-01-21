import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import DrawerContent from '../DrawerContent'
import AppBarContent from '../AppBarContent'

const initialDrawerWidth = 73
const fullDrawerWidth = 240

const openedMixin = theme => ({
  width: fullDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `${initialDrawerWidth}px`
})

const Content = styled(Box, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `${initialDrawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: `${fullDrawerWidth}px`
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  boxShadow: theme.shadows[0],
  width: `calc(100% - ${initialDrawerWidth}px)`,
  marginLeft: `${initialDrawerWidth}px`,
  ...(open && {
    width: `calc(100% - ${fullDrawerWidth}px)`,
    marginLeft: `${fullDrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  width: fullDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  color: '#fff',
  '& .MuiPaper-root': { backgroundColor: theme.palette.primary.dark },
  '&:hover': {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      ...(!open && { boxShadow: theme.shadows[4] })
    }
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export default function DashboardDesktopLayout ({ open, setOpen, children }) {
  // const theme = useTheme()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' open={open}>
          <AppBarContent open={open} setOpen={setOpen} />
        </AppBar>
      </Box>
      <Drawer variant='permanent' open={open}>
        <DrawerContent />
      </Drawer>
      <Content sx={{ mt: 2 }} open={open}>
        {children}
      </Content>
    </>
  )
}
