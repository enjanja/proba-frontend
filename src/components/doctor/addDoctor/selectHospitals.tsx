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
import { toast } from 'react-toastify'

interface SelectHospitalsProps {
  onSelectHospitals: (hospital: HospitalType) => void
  chosenHospitals: HospitalType[]
  errorHospital: string
}

const HospitalsSelect = ({
  onSelectHospitals,
  chosenHospitals,
  errorHospital,
}: SelectHospitalsProps) => {
  const [hospitals, setHospitals] = useState<HospitalType[]>([])

  useEffect(() => {
    hospitalService
      .getAllHospitals()
      .then((res) => {
        setHospitals(res.data)
      })
      .catch((err) => {
        if (!err) {
          toast.error('Network error')
        }

        toast.error(err.message)
      })
  }, [])

  const handleSelectHospital = (event: SelectChangeEvent) => {
    const selectedHosp = hospitals.find((item) => {
      return item.id === Number(event.target.value)
    })

    if (chosenHospitals.length === 4) {
      toast.error('You can select max 4 hospitals')
      return
    }

    if (selectedHosp === undefined) return

    if (chosenHospitals.includes(selectedHosp)) {
      toast.error('this hospital was already chosen')
      return
    }
    selectedHosp && onSelectHospitals(selectedHosp)
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
        <Error>{errorHospital}</Error>
      </FormControl>
    </AddDoctorInputContainer>
  )
}

export default HospitalsSelect
