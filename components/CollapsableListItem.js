import { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function CollapsableListItem ({ primary, icon, children, iconSx, buttonSx }) {
  const Icon = icon
  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)} sx={{ paddingLeft: 3, ...(buttonSx && buttonSx) }}>
        {icon && <ListItemIcon sx={iconSx}>
          {<Icon />}
        </ListItemIcon>}
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}
