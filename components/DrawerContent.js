import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import MuiListItem from '@mui/material/ListItem'
import MuiListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FaceIcon from '@mui/icons-material/Face'
import { styled } from '@mui/material/styles'
import CollapsableListItem from './CollapsableListItem'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MuiListItemButton from '@mui/material/ListItemButton'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SchoolIcon from '@mui/icons-material/School'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ListItemIcon = styled(MuiListItemIcon)`
  color: #fff;
`

const ListItemButton = styled(MuiListItemButton)`
  color: #fff;

  &:hover {
    background-color: rgba(0, 157, 174, 0.8);
  }

  &.Mui-selected {
    background-color: rgba(0, 157, 174, 0.4);

    &:hover {
      background-color: rgba(0, 157, 174, 0.8);
    }
  }
`

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  ...(open && {
    justifyContent: 'space-between'
  })
}))

export default function DrawerContent () {
  const router = useRouter()
  return (
    <>
      <DrawerHeader>
        {/* <IconButton onClick={() => setOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton> */}
      </DrawerHeader>
      <Divider />
      <List>
        <CollapsableListItem
          primary='أولياء الأمور'
          icon={<SupervisorAccountIcon sx={{ color: '#fff' }} />}
          sx={{ color: '#fff' }}
          initialOpen={router.pathname.startsWith('/dashboard/guardians')}
        >
          <List component='div' disablePadding>
            <Link href='/dashboard/guardians/create'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/guardians/create'}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='إضافة' />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/guardians'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/guardians'}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary='عرض الكل' />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem
          primary='الطلاب'
          icon={<FaceIcon sx={{ color: '#fff' }} />}
          sx={{ color: '#fff' }}
          initialOpen={router.pathname.startsWith('/dashboard/students')}
        >
          <List component='div' disablePadding>
            <Link href='/dashboard/students/create'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/students/create'}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='إضافة' />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/students'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/students'}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary='عرض الكل' />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem
          primary='الفصول'
          icon={<SchoolIcon sx={{ color: '#fff' }} />}
          sx={{ color: '#fff' }}
          initialOpen={router.pathname.startsWith('/dashboard/classes')}
        >
          <List component='div' disablePadding>
            <Link href='/dashboard/classes/create'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/classes/create'}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='إضافة' />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/classes'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/classes'}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary='عرض الكل' />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem
          primary='الجلسات'
          icon={<AssignmentTurnedInIcon sx={{ color: '#fff' }} />}
          sx={{ color: '#fff' }}
          initialOpen={router.pathname.startsWith('/dashboard/sessions')}
        >
          <List component='div' disablePadding>
            <Link href='/dashboard/sessions/create'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/sessions/create'}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='إضافة' />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/sessions'>
              <ListItemButton
                component='a'
                sx={{ pl: 4 }}
                selected={router.pathname === '/dashboard/sessions'}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary='عرض الكل' />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
      </List>
    </>
  )
}
