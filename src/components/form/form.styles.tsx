import styled from 'styled-components'
import { colors } from '../../global.styles'
import { HospitalType } from '../../interfaces/dataTypes'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 20px;
  width: 300px;
  margin: 0;

  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
`

export const Form = styled.form`
  width: 100%;
  margin: 0;
`

export const InputContainer = styled.div`
  min-height: 90px;
  max-height: 100px;
  width: 100%;
  text-align: start;
  position: relative;
`

export const InputContainerPassword = styled.div`
  width: 70%;
  text-align: start;
  position: relative;
`

export const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 0;
  margin-top: 5px;
  text-indent: 10px;
  color: ${colors.black};
  font-size: 15px;
  border: 2px solid ${colors.grey};
  border-radius: 10px;
  &:focus {
    outline: none;
    border: 2px solid ${colors.blue};
  }
  &:disabled::-webkit-input-placeholder {
    color: ${colors.grey};
    border: none;
    outline: none;
  }
`

export const Label = styled.label`
  max-width: 100px;
  font-size: 15px;
  margin-bottom: 10px;
`

export const FormListContainer = styled.div`
  display: flex;
  justify-content: end;
`

export const FormListItem = styled.div`
  margin-bottom: 5px;
`
export const AddDoctorFormContainer = styled.div`
  padding: 20px;
  width: 400px;
  margin: 0;
  height: fit-content;

  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
`
export const AddDoctorInputContainer = styled.div`
  min-height: 80px;
  max-height: 80px;
  width: 100%;

  display: flex;
  justify-content: space-between;
`
export const AddDoctorInputFieldContainer = styled.div`
  width: 70%;
`

export const ListContainer = styled.div`
  height: fit-content;
  width: 100px;
`

export const MyListItem = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 10px;
  background-color: #dfdfe2;
  padding: 0 2px;
  margin: 0 0 5px 0;
`
export const MyListItemText = styled.span`
  .white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  .truncate {
    width: 100px;
    .white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const ButtonDivider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`
export const ButtonDividerInner = styled.div`
  width: 45%;
`
export const Hospital = ({ hospital }: { hospital: HospitalType }) => {
  return (
    <MyListItem>
      <MyListItemText>{hospital.name}</MyListItemText>
    </MyListItem>
  )
}
