import { TransparentButton } from '../../button/button.styles'
import {
  AddDoctorInputContainer,
  Label,
  ListContainer,
  MyListItem,
  MyListItemText,
} from '../../form/form.styles'
import { TiDelete } from 'react-icons/ti'
import { HospitalType } from '../../../interfaces/dataTypes'
import { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Error } from '../../text/text.styles'
import hospitalService from '../../../services/hospitalService'

const data = [
  { id: 1, name: 'aabb', address: 'aa' },
  { id: 2, name: 'aaccc', address: 'aa' },
  { id: 3, name: 'aadd', address: 'aa' },
  { id: 4, name: 'aadd', address: 'aa' },
  { id: 5, name: 'aadd', address: 'aa' },
]

interface SelectHospitalsProps {
  onSelectHospitals: (hospital: HospitalType) => void
  chosenHospitals: HospitalType[]
  jwt: string
  errorHospital: string
  onError: (err: string) => void
}

const HospitalsSelect = ({
  onSelectHospitals,
  chosenHospitals,
  jwt,
  errorHospital,
  onError,
}: SelectHospitalsProps) => {
  const [hospitals, setHospitals] = useState<HospitalType[]>(data)
  const [error, setError] = useState('')

  useEffect(() => {
    hospitalService
      .getAllHospitals(jwt)
      .then((res) => {
        setHospitals(res.data)
      })
      .catch((err) => {
        if (!err) {
          onError('Network Error')
        }
        onError(err.response?.data)
      })
  }, [])

  const handleSelectHospital = (event: SelectChangeEvent) => {
    const selectedHosp = hospitals.find((item) => {
      return item.id === Number(event.target.value)
    })

    if (chosenHospitals.length === 4) {
      setError('You can select max 4 hospitals')
      return
    }

    if (selectedHosp === undefined) return

    if (chosenHospitals.includes(selectedHosp)) {
      setError('this hospital was already chosen')
      return
    }
    selectedHosp && onSelectHospitals(selectedHosp)
    setError('')
  }

  const Hospital = ({ hospital }: { hospital: HospitalType }) => {
    const handleRemoveHospital = () => {
      onSelectHospitals(hospital)
    }

    return (
      <MyListItem>
        <TransparentButton onClick={handleRemoveHospital}>
          <TiDelete />
        </TransparentButton>
        <MyListItemText>{hospital.name}</MyListItemText>
      </MyListItem>
    )
  }

  const errHospital = error ? error : errorHospital

  return (
    <AddDoctorInputContainer>
      {chosenHospitals.length > 0 ? (
        <ListContainer>
          {chosenHospitals.map((h: HospitalType) => (
            <Hospital key={h.id} hospital={h} />
          ))}
        </ListContainer>
      ) : (
        <Label>Hospitals</Label>
      )}
      <FormControl fullWidth style={{ width: '70%', float: 'right' }}>
        <InputLabel id="hospital-select" sx={{ marginTop: '-6px' }}>
          Hospitals
        </InputLabel>
        <Select
          labelId="hospital"
          id="select"
          label="Hospitals"
          value={''}
          onChange={handleSelectHospital}
          sx={{
            height: '44px',
            borderRadius: '10px',
          }}
        >
          {hospitals.map((h) => (
            <MenuItem key={h.id} value={h.id}>
              {h.name}
            </MenuItem>
          ))}
        </Select>
        <Error>{errHospital}</Error>
      </FormControl>
    </AddDoctorInputContainer>
  )
}

export default HospitalsSelect
