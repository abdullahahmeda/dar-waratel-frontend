import MuiDatePicker from '@mui/lab/DatePicker'
import { Controller } from 'react-hook-form'

export default function DatePicker ({ control, name, ...datePickerProps }) {
  return (
    <Controller
      render={({ field }) => <MuiDatePicker {...field} {...datePickerProps} />}
      name={name}
      control={control}
    />
  )
}
