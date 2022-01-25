import { Autocomplete, Box, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import { DoctorType, HospitalType } from '../../interfaces/dataTypes'
import doctorService from '../../services/doctorService'
import hospitalService from '../../services/hospitalService'
import Calendar from '../calendar'

const Examinations = () => {
  const { control } = useForm()
  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const [doctor, setDoctor] = useState<DoctorType | null>(null)
  const [doctorWithExams, setDoctorWithExams] = useState<DoctorType | null>(
    null,
  )
  const [hospital, setHospital] = useState<HospitalType | null>(null)
  const [hospitals, setHospitals] = useState<HospitalType[]>([])

  useEffect(() => {
    doctorService
      .getAllDoctors()
      .then((res) => {
        setDoctors(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })

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

  useEffect(() => {
    if (doctor) {
      doctorService
        .getAllDoctorByUsername(doctor?.username)
        .then((res) => {
          setDoctorWithExams(res.data)
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }
  }, [doctor])

  return (
    <>
      <Box sx={{ padding: '10px 0 0 20px ' }}>
        <Stack direction="row" spacing={2}>
          <div style={{ width: '300px' }}>
            <Controller
              render={({ field: { value } }) => (
                <Autocomplete
                  options={doctors}
                  getOptionLabel={(option: DoctorType) => option.name}
                  renderOption={(
                    props: React.HTMLAttributes<HTMLLIElement>,
                    option: DoctorType,
                  ) => (
                    <Box component="li" {...props} key={option.id}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Doctor" value={value} />
                    )
                  }}
                  onChange={(_, data) => setDoctor(data)}
                />
              )}
              defaultValue={doctors[0]}
              name="doctor"
              control={control}
            />
          </div>
          <div style={{ width: '300px' }}>
            <Controller
              render={({ field: { value } }) => (
                <Autocomplete
                  options={hospitals}
                  getOptionLabel={(option: HospitalType) => option.name}
                  renderOption={(
                    props: React.HTMLAttributes<HTMLLIElement>,
                    option: HospitalType,
                  ) => (
                    <Box component="li" {...props} key={option.id}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Hospital" value={value} />
                    )
                  }}
                  onChange={(_, data) => setHospital(data)}
                />
              )}
              defaultValue={hospitals[0]}
              name="hospital"
              control={control}
            />
          </div>
        </Stack>
      </Box>
      {doctorWithExams && hospital ? (
        <Box sx={{ padding: '5px', height: 'fill' }}>
          <Calendar
            hospital={hospital}
            doctor={doctorWithExams}
            examinations={doctorWithExams?.examinations}
          />
        </Box>
      ) : (
        <Grid
          container
          direction={'row'}
          justifyContent={'center'}
          height={'400px'}
        >
          <h3 style={{ color: colors.secondary }}>Select a doctor</h3>
        </Grid>
      )}
    </>
  )
}

export default Examinations
