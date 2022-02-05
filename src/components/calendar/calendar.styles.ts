import styled from 'styled-components'
import { colors } from '../../global.styles'

export const CalendarContainer = styled.div`
  margin: 20px;
  width: 80%;
`

export const Header = styled.div`
  padding: 5px;
  background: ${colors.secondary};
  color: ${colors.base};
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;

  div {
    width: 100%;
    display: flex;
    justify-content: center;

    :hover {
      color: ${colors.primary};
    }
  }
`

export const Kalendar = styled.div`
  background: ${colors.secondaryDisabled};
`

export const KalendarContent = styled.table`
  /* border-collapse: collapse; */
  width: 100%;
  height: 430px;
`
export const KalendarContentSecond = styled.table`
  /* border-collapse: collapse; */
  width: 100%;
  height: 430px;
`

export const DayNames = styled.thead`
  width: 100%;
  background: ${colors.secondaryLight};
  color: ${colors.base};
  padding: 10px;
  font-style: oblique;

  tr {
    height: 30px;
  }
`

export const Days = styled.tr`
  background: ${colors.base};
`

export const Cell1 = styled.td`
  width: 50px;
  max-width: 50px;
  background: ${colors.base};
  overflow: hidden;
  position: relative;
`

export const Day = styled.div`
  width: 100%;
  height: 100%;
  max-height: 90px;
  background: ${colors.base};
  cursor: pointer;

  &:hover {
    background-color: ${colors.hover};
  }

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const BlankDay = styled.td`
  width: 1/7 * 100%;
  max-width: 50px;
  max-height: 90px;
  background: ${colors.secondaryDisabled};
`

export const DayNumber = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
  color: white;
`

export const TodayNumber = styled(DayNumber)`
  color: ${colors.danger};
`

export const ExaminationContainer = styled.div`
  background: ${colors.primary};
  font-size: 11px;
  border-radius: 3px;
  padding: 2px 5px;
  margin: 2px;
  cursor: pointer;
`

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Header2 = styled.tr`
  color: ${colors.base};
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
`

export const Cell2 = styled.td`
  width: 50px;
  max-width: 50px;
  height: 50px;
  max-height: 50px;
  background: ${colors.base};
  text-align: center;

  cursor: pointer;
  &:hover {
    color: ${colors.secondaryLight};
    background: ${colors.primaryLight};
  }
`

interface BusynessProp {
  color: string
}

export const Busyness = styled.div<BusynessProp>`
  display: flex;
  align-items: center;
  color: white;
  height: 20px;
  background: ${({ color }) => color};
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 13px;
`
