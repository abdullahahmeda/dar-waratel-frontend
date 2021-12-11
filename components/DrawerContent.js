import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import MuiListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FaceIcon from '@mui/icons-material/Face'
import { styled } from '@mui/material/styles'
import CollapsableListItem from './CollapsableListItem'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ListItemButton from '@mui/material/ListItemButton'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SchoolIcon from '@mui/icons-material/School'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import Link from 'next/link'

const ListItem = styled(MuiListItem)(
  ({ theme }) => ({
    paddingLeft: theme.spacing(3)
  })
)

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
  return (
    <>
      <DrawerHeader>
        {/* <IconButton onClick={() => setOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton> */}
      </DrawerHeader>
      <Divider />
      <List>
        <CollapsableListItem primary='أولياء الأمور' icon={SupervisorAccountIcon}>
          <List component="div" disablePadding>
            <Link href='/dashboard/guardians/add'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="إضافة" />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/guardians'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="عرض الكل" />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem primary='الطلاب' icon={FaceIcon}>
          <List component="div" disablePadding>
            <Link href='/dashboard/students/add'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="إضافة" />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/students'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="عرض الكل" />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem primary='الفصول' icon={SchoolIcon}>
          <List component="div" disablePadding>
            <Link href='/dashboard/classes/add'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="إضافة" />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/classes'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="عرض الكل" />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
        <CollapsableListItem primary='الجلسات' icon={AssignmentTurnedInIcon}>
          <List component="div" disablePadding>
            <Link href='/dashboard/sessions/add'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="إضافة" />
              </ListItemButton>
            </Link>
            <Link href='/dashboard/sessions'>
              <ListItemButton component='a' sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="عرض الكل" />
              </ListItemButton>
            </Link>
          </List>
        </CollapsableListItem>
      </List>
    </>
  )
}
