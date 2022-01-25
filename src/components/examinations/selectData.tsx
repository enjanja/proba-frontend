import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DoctorType } from '../../interfaces/dataTypes'

export default function SelectData({
  control,
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  data: DoctorType[]
}) {
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          options={data}
          getOptionLabel={(option: DoctorType) => option.name}
          renderInput={(params) => {
            return <TextField {...params} label="Doctor" value={value} />
          }}
          onChange={(_, data) => onChange(data)}
        />
      )}
      defaultValue="default"
      name="data"
      control={control}
    />
  )
}
