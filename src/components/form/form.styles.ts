import styled from 'styled-components'
import { colors } from '../../global.styles'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 20px;
  width: 300px;
  margin: 0;

  background-color: ${colors.base};
  border-radius: 10px;
  box-shadow: 0 0 4px 0 ${colors.shadow};
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

export const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 0;
  margin-top: 5px;

  text-indent: 10px;
  color: ${colors.text};
  font-size: 15px;

  border: 2px solid ${colors.inputBorder};
  border-radius: 10px;

  &:focus {
    outline: none;
    border: 2px solid ${colors.primary};
  }

  &:disabled::-webkit-input-placeholder {
    color: ${colors.inputBorder};
    border: none;
    outline: none;
  }
`

export const Label = styled.label`
  font-size: 15px;
  margin-bottom: 10px;
`

export const FormListContainer = styled.div`
  padding: 5px;
  margin: 10px 0;
`

export const FormListItem = styled.div`
  margin-bottom: 5px;
`
export const AddDoctorFormContainer = styled.div`
  padding: 20px;
  width: 400px;
  margin: 0;
  height: fit-content;

  background-color: ${colors.base};
  border-radius: 10px;
  box-shadow: 0 0 4px 0 ${colors.shadow};
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
