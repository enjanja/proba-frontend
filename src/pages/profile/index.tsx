import { useEffect, useState } from 'react'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  ButtonDivider,
  ButtonDividerInner,
  Form,
  Label,
} from '../../components/form/form.styles'
import { InnerWrapper, Wrapper } from '../../components/layout/layout.styles'
import { Button } from '../../components/button/button.styles'
import { Controller, useForm } from 'react-hook-form'
import {
  HospitalType,
  SpecializationType,
  UserType,
} from '../../interfaces/dataTypes'
import doctorService from '../../services/doctorService'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import SelectSpecialization from '../../components/doctor/addDoctor/selectSpecialization'
import HospitalsSelect from '../../components/doctor/addDoctor/selectHospitals'
import { Autocomplete, TextField } from '@mui/material'
import nurseService from '../../services/nurseService'
import { Box } from '@mui/system'
import hospitalService from '../../services/hospitalService'
import Modal from '../../components/modal/Modal'
import UpdatePassword from '../../components/modal/UpdatePassword'

const Profile = () => {
  const type = JSON.parse(localStorage.getItem('type') || '')
  const [user, setUser] = useState<UserType | null>(null)
  const { handleSubmit, register, setValue, control } = useForm({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      specialization: user?.specialization,
      hospital: user?.hospital,
    },
  })

  const [isEditable, setIsEditable] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [specialization, setSpecialization] = useState<SpecializationType>({
    name: '',
    id: 0,
  })

  const [chosenHospitals, setChosenHospitals] = useState<HospitalType[]>([])
  const [hospital, setHospital] = useState<HospitalType | null>(null)
  const [hospitals, setHospitals] = useState<HospitalType[]>([])

  useEffect(() => {
    if (type === 2) {
      console.log('uso')

      doctorService
        .getDoctorProfile()
        .then((res) => {
          console.log(res)
          setUser(res.data)
          console.log('uso')
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setSpecialization(res.data.specialization)
          setChosenHospitals(res.data.hospitals)
        })
        .catch((err) => toast.error(err.message))
    } else {
      nurseService
        .getNurseProfile()
        .then((res) => {
          setUser(res.data)
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setHospital(res.data.hospital)
        })
        .catch((err) => toast.error(err.message))

      hospitalService
        .getAllHospitals()
        .then((res) => {
          setHospitals(res.data)
        })
        .catch((err) => toast.error(err.message))
    }
  }, [])

  const handleEditForm = () => {
    if (user) {
      setIsEditable(!isEditable)
      if (type === 1 && user.hospitals) {
        setChosenHospitals(user.hospitals)
      }
    }
  }

  const handleSelectSpecialization = (spec: SpecializationType) => {
    setSpecialization(spec)
  }

  const handleSelectHospitals = (hospital: HospitalType) => {
    const hosps = [...chosenHospitals]
    const index = hosps.indexOf(hospital)
    if (index !== -1) {
      hosps.splice(index, 1)
      setChosenHospitals(() => hosps)
    } else {
      if (chosenHospitals.find((h) => h.id === hospital.id)) return
      setChosenHospitals((prev: HospitalType[]) => [...prev, hospital])
    }
  }

  const equalHospitals = (hospitals: HospitalType[]) => {
    const drsHospitals = []
    chosenHospitals.map((hospital) => {
      const h = hospitals.find((h) => h.id === hospital.id)
      if (h) {
        drsHospitals.push(h)
      }
    })
    if (
      drsHospitals.length === chosenHospitals.length &&
      chosenHospitals.length === hospitals?.length
    )
      return true
    return false
  }

  const onSubmit = (data: UserType) => {
    if (user && user.hospitals && user.specialization) {
      if (
        data.username === user?.username &&
        data.name === user.name &&
        data.password === user.password &&
        specialization.id === user.specialization.id &&
        equalHospitals(user.hospitals)
      ) {
        return
      }

      if (chosenHospitals.length === 0) {
        setChosenHospitals(user?.hospitals)
      }

      const newData = {
        ...data,
        hospitals: chosenHospitals,
        specialization: specialization,
        active: user?.active,
      }

      doctorService
        .updateDoctorProfile(newData)
        .then((res) => {
          console.log(res)
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setSpecialization(res.data.specialization)
          setChosenHospitals(res.data.hospitals)
          handleEditForm()
          toast.info('Profile updated')
        })
        .catch((err) => {
          console.log(err)
          toast.info(err.message)
        })
    }

    if (user && user.hospital) {
      if (
        data.username === user?.username &&
        data.name === user.name &&
        data.password === user.password &&
        data.hospital === user.hospital
      ) {
        return
      }

      const newData = {
        ...data,
        active: user?.active,
      }

      nurseService
        .updateNurseProfile(newData)
        .then((res) => {
          console.log(res)
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setHospital(res.data.hospitals)
          handleEditForm()
          toast.info('Profile updated')
        })
        .catch((err) => {
          console.log(err)
          toast.info(err.message)
        })
    }
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Wrapper>
      {openModal && (
        <Modal onClose={handleCloseModal}>
          <UpdatePassword onCancel={handleCloseModal} />
        </Modal>
      )}
      <InnerWrapper>
        <AddDoctorFormContainer>
          {(user?.hospitals || user?.hospital) && (
            <Form onSubmit={handleSubmit(onSubmit)} id="update-form">
              <AddDoctorInputContainer>
                <Label>Full Name</Label>
                <AddDoctorInputFieldContainer>
                  <TextField
                    placeholder="name"
                    disabled={!isEditable}
                    sx={{ width: '100%' }}
                    {...register('name')}
                  />
                </AddDoctorInputFieldContainer>
              </AddDoctorInputContainer>
              <AddDoctorInputContainer>
                <Label>Userame</Label>
                <AddDoctorInputFieldContainer>
                  <TextField
                    placeholder="username"
                    disabled={!isEditable}
                    sx={{ width: '100%' }}
                    {...register('username')}
                  />
                </AddDoctorInputFieldContainer>
              </AddDoctorInputContainer>
              {user.specialization && (
                <SelectSpecialization
                  defaultValue={user.specialization.name}
                  disabled={!isEditable}
                  specialization={specialization}
                  onSelectSpecialization={handleSelectSpecialization}
                />
              )}
              {user.hospitals && (
                <HospitalsSelect
                  disabled={!isEditable}
                  onSelectHospitals={handleSelectHospitals}
                  chosenHospitals={chosenHospitals}
                />
              )}
              {user.hospital && (
                <AddDoctorInputContainer>
                  <Label>Hospital</Label>
                  <AddDoctorInputFieldContainer>
                    <Controller
                      render={({ field: { value } }) => (
                        <Autocomplete
                          disabled={!isEditable}
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
                              <TextField
                                {...params}
                                label={hospital?.name}
                                disabled={!isEditable}
                                value={value}
                              />
                            )
                          }}
                          onChange={(_, data) => setHospital(data)}
                        />
                      )}
                      name="hospital"
                      control={control}
                    />
                  </AddDoctorInputFieldContainer>
                </AddDoctorInputContainer>
              )}
              <ButtonDivider>
                <ButtonDividerInner>
                  {!isEditable && (
                    <Button onClick={handleEditForm} type="button">
                      Edit
                    </Button>
                  )}
                  {isEditable && (
                    <Button
                      form="update-form"
                      type="button"
                      color={colors.primary}
                      onClick={handleEditForm}
                    >
                      Cancel
                    </Button>
                  )}
                </ButtonDividerInner>{' '}
                <ButtonDividerInner>
                  {isEditable && (
                    <Button
                      form="update-form"
                      type="submit"
                      color={colors.secondary}
                    >
                      Update
                    </Button>
                  )}
                  {!isEditable && (
                    <Button
                      color={colors.secondary}
                      onClick={handleOpenModal}
                      type="button"
                    >
                      Change Password
                    </Button>
                  )}
                </ButtonDividerInner>
              </ButtonDivider>
            </Form>
          )}
        </AddDoctorFormContainer>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Profile
