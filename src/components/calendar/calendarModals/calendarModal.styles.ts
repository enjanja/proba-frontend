import styled from 'styled-components'
import { colors } from '../../../global.styles'

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.base};
  border-radius: 10px;
  padding: 10px;
`

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const RowContainer = styled.div`
  display: flex;
`

export const TimeTableContainer = styled.div`
  width: 400px;
  padding: 0;

  background-color: ${colors.base};
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  color: ${colors.secondaryDisabled};
`

export const AppointmentSlot = styled.div`
  margin: 0 10px;
  border-bottom: 1px solid ${colors.secondaryDisabled};
  height: 34px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-indent: 5px;
  font-size: 13px;
  &:hover {
    background: ${colors.hover};
  }
`

export const AppointmentSlotBottom = styled(AppointmentSlot)`
  border-bottom: none;
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
