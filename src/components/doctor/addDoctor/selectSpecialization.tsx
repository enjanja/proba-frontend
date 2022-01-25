import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SpecializationType } from '../../../interfaces/dataTypes'
import specializationService from '../../../services/specializationService'
import { AddDoctorInputContainer, Label } from '../../form/form.styles'
import { Error } from '../../text/text.styles'

interface SelectSpecializationProps {
  errorSpecialization: string
  onSelectSpecialization: (specialization: SpecializationType) => void
  specialization: SpecializationType
}

const SelectSpecialization = ({
  errorSpecialization,
  onSelectSpecialization,
  specialization,
}: SelectSpecializationProps) => {
  const [specializations, setSpecializations] = useState<SpecializationType[]>(
    [],
  )

  useEffect(() => {
    specializationService
      .getAllSpecializations()
      .then((res) => {
        setSpecializations(res?.data)
      })
      .catch((err) => {
        if (!err) {
          toast.error('Network error')
        }
        toast.error(err.message)
      })
  }, [])

  const handleSelectSpecialization = (event: SelectChangeEvent) => {
    const selectedSpec = specializations.find(
      (item) => item.name === event.target.value,
    )
    selectedSpec && onSelectSpecialization(selectedSpec)
  }

  return (
    <AddDoctorInputContainer>
      <Label>Specialization</Label>
      <FormControl fullWidth style={{ width: '70%', float: 'right' }}>
        <InputLabel id="specialization" sx={{ marginTop: '-6px' }}>
          Specialization
        </InputLabel>
        <Select
          labelId="specialization"
          id="select"
          value={specialization.name}
          label="Specialization"
          onChange={handleSelectSpecialization}
          sx={{
            height: '44px',
            borderRadius: '10px',
          }}
        >
          {specializations.map((specialization) => (
            <MenuItem key={specialization.id} value={specialization.name}>
              {specialization.name}
            </MenuItem>
          ))}
        </Select>
        <Error>{errorSpecialization}</Error>
      </FormControl>
    </AddDoctorInputContainer>
  )
}

export default SelectSpecialization
