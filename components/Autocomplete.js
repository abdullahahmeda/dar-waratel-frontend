import MUIAutoComplete from '@mui/material/Autocomplete'
import { Controller } from 'react-hook-form'

export default function Autocomplete ({ control, name, ...autocompleteProps }) {
  return (
    <Controller
      render={({ field }) => (
      <MUIAutoComplete
        {...field}
        {...autocompleteProps}
        onChange={(_, data) => field.onChange(data)}
        loadingText='جاري التحميل...'
        noOptionsText='لا يوجد اختيارات'
      />)}
      name={name}
      control={control}
    />
  )
}
