import { useEffect, useState } from 'react'
import {
  InputFieldWrapper,
  InputContainer,
  ButtonDivider,
  ButtonDividerInner,
  Form,
  FormContainer,
  Label,
} from '../../components/form/form.styles'
import { CenterPage, Wrapper } from '../../components/layout/layout.styles'
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
  const userIsDoctor = user?.hospitals && user.specialization;

  useEffect(() => {
    if (type === 2) {
      doctorService
        .getDoctorProfile()
        .then((res) => {
          setUser(res.data)
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
    if (userIsDoctor && user?.hospitals && user.specialization) {
      if (
        data.username === user.username &&
        data.name === user.name &&
        data.password === user.password &&
        specialization.id === user.specialization.id &&
        equalHospitals(user.hospitals)
      ) {
        console.log('break');
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
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setSpecialization(res.data.specialization)
          setChosenHospitals(res.data.hospitals)
          handleEditForm()
          toast.info('Profile updated')
        })
        .catch((err) => {
          toast.info(err.message)
        })
    }

    if (user?.hospital) {
      if (
        data.username === user.username &&
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
          setValue('name', res.data.name)
          setValue('username', res.data.username)
          setHospital(res.data.hospital)
          handleEditForm()
          toast.info('Profile updated')
        })
        .catch((err) => {
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
      <CenterPage>
        <FormContainer>
          {user && (
            <Form onSubmit={handleSubmit(onSubmit)} id="update-form">
              <InputFieldWrapper>
                <Label>Full Name</Label>
                <InputContainer>
                  <TextField
                    placeholder="name"
                    disabled={!isEditable}
                    sx={{ width: '100%' }}
                    {...register('name')}
                  />
                </InputContainer>
              </InputFieldWrapper>
              <InputFieldWrapper>
                <Label>Userame</Label>
                <InputContainer>
                  <TextField
                    placeholder="username"
                    disabled={!isEditable}
                    sx={{ width: '100%' }}
                    {...register('username')}
                  />
                </InputContainer>
              </InputFieldWrapper>
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
                <InputFieldWrapper>
                  <Label>Hospital</Label>
                  <InputContainer>
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
                  </InputContainer>
                </InputFieldWrapper>
              )}
              {userIsDoctor && !isEditable && (
                <ButtonDivider>
                  <ButtonDividerInner>
                    <Button onClick={handleEditForm} type="button">
                      Edit
                    </Button>
                  </ButtonDividerInner>
                  <ButtonDividerInner>
                    <Button
                      backgroundColor={colors.blue}
                      onClick={handleOpenModal}
                      type="button"
                    >
                      Change Password
                    </Button>
                  </ButtonDividerInner>
                </ButtonDivider>
              )}
              {userIsDoctor && isEditable && (
                <ButtonDivider>
                  <ButtonDividerInner>
                    <Button
                      form="update-form"
                      type="button"
                      backgroundColor={colors.blue}
                      onClick={handleEditForm}
                    >
                      Cancel
                    </Button>
                  </ButtonDividerInner>
                  <ButtonDividerInner>
                    <Button
                      form="update-form"
                      type="submit"
                      backgroundColor={colors.green}
                    >
                      Update
                    </Button>
                  </ButtonDividerInner>
                </ButtonDivider>
              )}
            </Form>
          )}
        </FormContainer>
      </CenterPage>
    </Wrapper>
  )
}

export default Profile
