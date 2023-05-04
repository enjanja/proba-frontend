import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import { DoctorType, HospitalType } from '../../interfaces/dataTypes'
import doctorService from '../../services/doctorService'
import hospitalService from '../../services/hospitalService'
import Calendar from '../calendar/calendar'
import { Content } from '../layout/layout.styles'

const Examinations = () => {
  const type = JSON.parse(localStorage.getItem('type') || '')

  const { control } = useForm()
  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const [doctor, setDoctor] = useState<DoctorType | null>(null)
  const [doctorWithExams, setDoctorWithExams] = useState<DoctorType | null>(
    null,
  )

  const [hospital, setHospital] = useState<HospitalType | null>(null)
  const [hospitals, setHospitals] = useState<HospitalType[]>([])

  useEffect(() => {
    if (type === 1) {
      doctorService
        .getAllDoctors()
        .then((res) => {
          setDoctors(res.data)
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }

    if (type === 2) {
      doctorService
        .getDoctorProfile()
        .then((res) => {
          setDoctor(res.data)
          setHospitals(res.data.hospitals)
        })
        .catch((err) => toast.error(err.message))
    }
  }, [])

  const handleSetDoctor = (doctor: DoctorType | null) => {
    setDoctor(doctor)
    setHospitals([])
    setHospital(null)
  }

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

      if (type === 1) {
        hospitalService
          .getHospitalsByDoctor(doctor)
          .then((res) => {
            setHospitals(res.data)
          })
          .catch((err) => toast.error(err.message))
      }
    }
  }, [doctor])

  return (
    <Content>
      <Stack direction="row" spacing={2} sx={{ paddingBottom: '20px' }}>
        {type === 1 && (
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
                  onChange={(_, data) => handleSetDoctor(data)}
                />
              )}
              name="doctor"
              control={control}
            />
          </div>
        )}
        <div style={{ width: '300px', paddingLeft: type === 1 ? '' : '20px' }}>
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
                    {console.log('render', option)}
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Hospital" value={value} />
                )}
                onChange={(_, data) => setHospital(data)}
              />
            )}
            name="hospital"
            control={control}
          />
        </div>
      </Stack>
      {doctorWithExams && hospital ? (
        <Calendar
          type={type}
          hospital={hospital}
          doctor={doctor?.examinations ? doctor : doctorWithExams}
          examinations={
            doctor?.examinations
              ? doctor.examinations
              : doctorWithExams?.examinations
          }
        />
      ) : (
        <h3 style={{ color: colors.black }}>
          Select a {type === 1 && `doctor and `} hospital
        </h3>
      )}
    </Content>
  )
}

export default Examinations
