import { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function CollapsableListItem ({
  primary,
  icon,
  children,
  initialOpen,
  ...props
}) {
  const [open, setOpen] = useState(Boolean(initialOpen))
  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        {...props}
        sx={{ paddingLeft: 3, ...(props.sx && props.sx) }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}
