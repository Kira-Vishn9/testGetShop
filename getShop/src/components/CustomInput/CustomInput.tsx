import TextField from '@mui/material/TextField'

export default function CustomInput ({
  isError,
  value
}: {
  isError: boolean
  value: string
}) {
  return (
    <TextField
      value={value}
      variant="standard"
      error={isError}
      InputProps={{
        readOnly: true
      }}
    />
  )
}
