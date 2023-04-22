import moment from 'moment'
import './calendar.css'
import { KalendarContent, Cell2, TableHeader } from './calendar.styles'

interface YearTableProps {
  onShowYearTable: () => void
  onSetDateObject: (newObject: moment.Moment) => void
  dateObject: moment.Moment
  year: string | undefined
}

const YearTable = ({
  onShowYearTable,
  dateObject,
  onSetDateObject,
  year,
}: YearTableProps) => {
  const months: JSX.Element[] = []
  const nextten = moment().set('year', Number(year)).add('year', 12).format('Y')

  const setYear = (year: string) => {
    let newDateObject = Object.assign({}, dateObject)
    newDateObject = moment(dateObject).set('year', Number(year))

    onSetDateObject(newDateObject)
    onShowYearTable()
  }

  const getDates = (
    startDate: moment.MomentInput,
    stopDate: moment.MomentInput,
  ) => {
    const dateArray = []
    let currentDate = moment(startDate)
    const stopDateNew = moment(stopDate)
    while (currentDate <= stopDateNew) {
      dateArray.push(moment(currentDate).format('YYYY'))
      currentDate = moment(currentDate).add(1, 'year')
    }
    return dateArray
  }

  const tenyear = getDates(year, nextten)

  tenyear.map((data) => {
    months.push(
      <Cell2
        key={data}
        onClick={() => {
          setYear(data)
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
      cells.push(row)
    } else {
      rows.push(cells)
      cells = []
      cells.push(row)
    }
  })
  rows.push(cells)
  const yearlist = rows.map((d, i) => {
    return <tr key={i}>{d}</tr>
  })

  return (
    <KalendarContent>
      <TableHeader>
        <tr>
          <th style={{ width: '33.33%' }}>Select a Yeah</th>
          <th></th>
          <th></th>
        </tr>
      </TableHeader>
      <tbody>{yearlist}</tbody>
    </KalendarContent>
  )
}

export default YearTable
