import moment from 'moment'
import {
  KalendarContent,
  Cell2,
  TableHeader,
  TableSubHeader,
} from './calendar.styles'

interface MonthTableProps {
  onToggleMonthTable: () => void
  onSetDateObject: (newObject: moment.Moment) => void
  dateObject: moment.Moment
  data: string[]
}

const MonthList = ({
  data,
  dateObject,
  onSetDateObject,
  onToggleMonthTable,
}: MonthTableProps) => {
  const months: JSX.Element[] = []
  const allMonths = moment.months()

  const setMonth = (month: string) => {
    const monthNo = allMonths.indexOf(month)
    let newDateObject = Object.assign({}, dateObject)
    newDateObject = moment(dateObject).month(monthNo)
    onSetDateObject(newDateObject)
    onToggleMonthTable()
  }

  data.map((data: string) => {
    months.push(
      <Cell2
        key={data}
        onClick={() => {
          setMonth(data)
        }}
      >
        <span>{data}</span>
      </Cell2>,
    )
  })
  const rows = []
  let cells: JSX.Element[] = []

  months.forEach((row, i) => {
    if (i % 3 !== 0 || i == 0) {
      cells.push(row) // except zero index
    } else {
      rows.push(cells)
      cells = []
      cells.push(row)
    }
  })
  rows.push(cells) // add last row

  return (
    <KalendarContent>
      <TableHeader>
        <tr>
          <TableSubHeader>Select a Month</TableSubHeader>
          <TableSubHeader></TableSubHeader>
          <TableSubHeader></TableSubHeader>
        </tr>
      </TableHeader>
      <tbody>
        {rows.map((d, i) => {
          return <tr key={i}>{d}</tr>
        })}
      </tbody>
    </KalendarContent>
  )
}

export default MonthList
