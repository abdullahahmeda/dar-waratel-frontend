import DialogContext from './dialog-context'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useContext, useState } from 'react'

export function DialogProvider ({ children }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [actions, setActions] = useState(null)

  const openModal = (options) => {
    if (!options) options = {}
    setTitle(options.title)
    setText(options.text)
    setActions(options.actions)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <DialogContext.Provider value={{ openModal, closeModal }}>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          {actions && <DialogActions>
            {actions}
          </DialogActions>}
        </Dialog>
        {children}
      </>
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)
