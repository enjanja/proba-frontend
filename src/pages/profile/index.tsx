import { useState } from 'react'
import {
  AddDoctorFormContainer,
  AddDoctorInputContainer,
  AddDoctorInputFieldContainer,
  Form,
  FormListContainer,
  FormListItem,
  Input,
  Label,
} from '../../components/form/form.styles'
import { Wrapper } from '../../components/layout/layout.styles'
import { AcentText, PlainText } from '../../components/text/text.styles'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { ButtonSecondary } from '../../components/button/button.styles'
import { useForm } from 'react-hook-form'
import { UserType } from '../../interfaces/dataTypes'
import Navbar from '../../components/navbar'

const Profile = () => {
  const { handleSubmit } = useForm()

  const [isEditable, setIsEditable] = useState(false)
  const [user, setUser] = useState<UserType>({
    username: 'pera123',
    password: 'pera123',
    name: 'Pera Peric',
    role: 2,
    active: true,
    specialization: { id: 1, name: 'Mladi Doktor' },
    hospitals: [
      {
        address: 'adresa 1 Kurac Palac',
        name: 'Bolnica 1 ',
        id: 1,
      },
      {
        address: 'adresa 2',
        name: 'Bolnica 2',
        id: 2,
      },
    ],
  })

  const handleEditForm = () => {
    setIsEditable(true)
  }

  const onSubmit = (data: UserType) => {
    setUser(data)

    setTimeout(() => {
      setIsEditable(false)
    }, 5000)
  }

  return (
    <>
      <Navbar showProfile absolute />
      <Wrapper>
        <AddDoctorFormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AddDoctorInputContainer>
              <Label>Full Name</Label>
              <AddDoctorInputFieldContainer>
                <Input placeholder={user.name} disabled={!isEditable} />
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <AddDoctorInputContainer>
              <Label>Userame</Label>
              <AddDoctorInputFieldContainer>
                <Input placeholder={user.username} disabled={!isEditable} />
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <AddDoctorInputContainer>
              <Label>Password</Label>
              <AddDoctorInputFieldContainer>
                <Input
                  placeholder={user.password}
                  type="password"
                  disabled={!isEditable}
                />
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <AddDoctorInputContainer>
              <Label>Specialization</Label>
              <AddDoctorInputFieldContainer>
                <Input
                  placeholder={user.specialization.name}
                  disabled={!isEditable}
                />
              </AddDoctorInputFieldContainer>
            </AddDoctorInputContainer>
            <Label>Works in: </Label>
            <FormListContainer>
              {user.hospitals.map((hospital) => {
                return (
                  <FormListItem key={hospital.id}>
                    <PlainText>{hospital.name} </PlainText>
                    <AcentText>
                      {hospital.address} <FaMapMarkerAlt />
                    </AcentText>
                  </FormListItem>
                )
              })}
            </FormListContainer>

            <ButtonSecondary disabled={!isEditable}>Update</ButtonSecondary>
          </Form>
          <ButtonSecondary onClick={handleEditForm}>Edit</ButtonSecondary>
        </AddDoctorFormContainer>
      </Wrapper>
    </>
  )
}

export default Profile
