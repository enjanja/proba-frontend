import styled from 'styled-components'
import { colors } from '../../global.styles'

export const CalendarContainer = styled.div`
  border: 1px solid ${colors.hover};
  box-shadow: 0px 0px 6px 2px rgba(31, 24, 24, 0.2);
  border-radius: 5px;
  width: 90%;
`

export const Header = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${colors.hover};
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    :hover {
      color: ${colors.blue};
    }
  }
`
export const KalendarContent = styled.table`
  width: 100%;
  border-collapse: collapse;
`
export const TableHeader = styled.thead`
  border-bottom: 1px solid ${colors.hover};
  height: 30px;
  width: 100%;
`
export const DayTableCell = styled.td`
  cursor: pointer;
  border: 1px solid ${colors.hover};
`
export const DayTableCellContent = styled.div`
  display: flex;
  height: 5rem;
  &:hover {
    background-color: ${colors.hover};
  }
`
export const TodayNumber = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  background-color: ${colors.white};
  color: ${colors.red};
`
export const Cell2 = styled.td`
  height: 6rem;
  border: 1px solid ${colors.hover};
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${colors.black};
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
  color: .white;
  background: ${({ backgroundColor }) => backgroundColor};
`
export const TableSubHeader = styled.th`
  background-color: ${colors.hover};
  border-bottom: 1px solid ${colors.blue};
  border-top: 1px solid ${colors.blue};
`
