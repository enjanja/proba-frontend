import styled from 'styled-components'
import { colors } from '../../../global.styles'

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 10px;
`

export const ColumnContainer = styled.div`
  margin: 0 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`
interface AppointmentSlotProps {
  isSelected: boolean
}
export const AppointmentSlot = styled.div<AppointmentSlotProps>`
  border-bottom: 1px solid ${colors.black};
  height: 34px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-indent: 5px;
  font-size: 13px;
  background-color: ${({ isSelected }) => (isSelected ? colors.white : '')};
  &:hover {
    color: ${colors.blue};
    border-color: ${colors.blue};
  }
`
export const AppointmentSlotBottom = styled(AppointmentSlot)<
  AppointmentSlotProps
>`
  border-bottom: none;
  background-color: ${({ isSelected }) => (isSelected ? colors.white : '')};
`
export const Time = styled.div`
  width: 30%;
`
export const Patient = styled.div`
  width: 70%;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
`
export const AddExamModalHolder = styled.div`
  display: flex;
  flex-direction: column;
`
