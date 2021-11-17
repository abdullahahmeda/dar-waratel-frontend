import MuiTextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

export default function TextField ({ control, name, ...props }) {
  return (
    <Controller
      render={({ field }) => <MuiTextField {...field} {...props} />}
      name={name}
      control={control}
    />
  )
}
