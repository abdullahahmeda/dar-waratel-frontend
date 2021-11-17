import MuiRadioGroup from '@mui/material/RadioGroup'
import { Controller } from 'react-hook-form'

export default function RadioGroup ({ control, name, children, ...props }) {
  return (
    <Controller
      render={({ field }) => <MuiRadioGroup {...field} {...props}>{children}</MuiRadioGroup>}
      name={name}
      control={control}
    />
  )
}
