import styled from 'styled-components'
import { colors } from '../../global.styles'

export const CalendarContainer = styled.div`
  border: 1px solid ${colors.text};
  border-radius: 5px;
  width: 90%;
`

export const Header = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${colors.text};
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    :hover {
      color: ${colors.primary};
    }
  }
`
export const KalendarContent = styled.table`
  width: 100%;
  border-collapse: collapse;
`
export const TableHeader = styled.thead`
  border-bottom: 1px solid ${colors.text};
  height: 30px;
  width: 100%;
`
export const DayTableCell = styled.td`
  cursor: pointer;
  border: 1px solid ${colors.primary};
`
export const DayTableCellContent = styled.div`
  display: flex;
  background-color: ${colors.white};
  height: 6rem;
  &:hover {
    background-color: ${colors.hover};
  }
`
export const DayNumber = styled.div``
export const TodayNumber = styled(DayNumber)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  background-color: ${colors.white};
  color: ${colors.danger};
`
export const Cell2 = styled.td`
  height: 6rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${colors.secondaryLight};
    background: ${colors.hover};
  }
`
interface DayHeaderProp {
  backgroundColor: string
}
export const DayHeader = styled.div<DayHeaderProp>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
  height: 2rem;
  font-size: 15px;
  color: white;
  background: ${({ backgroundColor }) => backgroundColor};
`
