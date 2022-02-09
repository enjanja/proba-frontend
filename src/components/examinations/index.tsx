import { Autocomplete, Box, Grid, Paper, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import { DoctorType, HospitalType } from '../../interfaces/dataTypes'
import doctorService from '../../services/doctorService'
import hospitalService from '../../services/hospitalService'
import Calendar from '../calendar'
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

  // console.log(doctorWithExams?.examinations)

  return (
    <Content>
      <Paper
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ paddingTop: '20px' }}>
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
                    onChange={(_, data) => setDoctor(data)}
                  />
                )}
                defaultValue={doctors[0]}
                name="doctor"
                control={control}
              />
            </div>
          )}
          <div
            style={{ width: '300px', paddingLeft: type === 1 ? '' : '20px' }}
          >
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
              // defaultValue={hospitals[0] || null}
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
          <Grid
            container
            direction={'row'}
            justifyContent={'center'}
            height={'400px'}
          >
            <h3 style={{ color: colors.secondary }}>
              Select a {type === 1 && `doctor and `} hospital
            </h3>
          </Grid>
        )}
      </Paper>
    </Content>
  )
}

export default Examinations
