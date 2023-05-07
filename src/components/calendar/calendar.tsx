/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'
import moment from 'moment'
import YearTable from './yearTable'
import MonthList from './monthTable'
import {
  DoctorType,
  ExaminationType,
  HospitalType,
} from '../../interfaces/dataTypes'
import {
  DayHeader,
  CalendarContainer,
  DayTableCell,
  DayTableCellContent,
  TableHeader,
  Header,
  KalendarContent,
  TodayNumber,
  TableSubHeader,
} from './calendar.styles'
import DayModal from './calendarModals/calendarModal'
import { colors } from '../../global.styles'

interface CalendarProps {
  type: number
  doctor: DoctorType | null
  hospital: HospitalType | null
  examinations: ExaminationType[] | undefined
}
const arrowSize = '30px'
const LeftArrow = <RiArrowLeftSFill size={arrowSize} />
const RightArrow = <RiArrowRightSFill size={arrowSize} />

const Calendar = ({ doctor, examinations, hospital, type }: CalendarProps) => {
  const weekDays = moment.weekdaysShort()
  const weekdayshort = [...weekDays.slice(1), weekDays[0]]
  const [showYearTable, setShowYearTable] = useState(false)
  const [showMonthTable, setShowMonthTable] = useState(false)
  const [showDateTable, setShowDateTable] = useState(true)
  const [dateObject, setDateObject] = useState(moment())
  const [currentMonth, setCurrentMonth] = useState<string>() // mesec koji se prikazuje
  const [currentYear, setCurrentYear] = useState<string>() // godina koja se prikazuje
  const [thisMonthExams, setThisMonthExams] = useState<ExaminationType[]>([])
  const [chosenDayExams, setChosenDayExams] = useState<ExaminationType[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [todaysDate, setTodaysDate] = useState<Date | null>(null)
  const [newExaminations, setNewExaminations] = useState<
    ExaminationType[] | undefined
  >(examinations)

  useEffect(() => {
    setCurrentMonth(dateObject.format('MMMM'))
    setCurrentYear(dateObject.format('Y'))
  }, [dateObject])

  useEffect(() => {
    if (newExaminations) {
      const newDataForMonth = newExaminations.filter(
        (examination: ExaminationType) => {
          const monthName = moment.months(
            new Date(examination.id.dateTime).getMonth(),
          )
          if (
            new Date(examination.id.dateTime).getFullYear() ===
            Number(currentYear)
          ) {
            if (monthName === currentMonth) {
              return examination
            }
          }
        },
      )

      setThisMonthExams(newDataForMonth as ExaminationType[])
    }
  }, [currentMonth, currentYear, newExaminations])

  const setNewDateObject = (newDateObject: moment.Moment) => {
    setDateObject(newDateObject)
  }

  const daysInMonth = () => {
    return dateObject.daysInMonth()
  }

  const currentDay = () => {
    return dateObject.format('D')
  }

  const firstDayOfMonth = () => {
    const newDateObject = dateObject
    const firstDay = moment(newDateObject).startOf('month').format('d') // Day of week 0...1..5...6
    return firstDay
  }

  const toggleShowYearTable = () => {
    if (showMonthTable) {
      setShowMonthTable(false)
    }
    const showTable = showYearTable ? true : false
    setShowDateTable(showTable)
    setShowYearTable((prev) => !prev)
  }
  const toggleShowMonthTable = () => {
    if (showYearTable) {
      setShowYearTable(false)
    }
    const showTable = showMonthTable ? true : false
    setShowDateTable(showTable)
    setShowMonthTable((prev) => !prev)
  }  

  const onPrevMonth = () => {
    setNewDateObject(dateObject.subtract(1, 'month'))
    setCurrentMonth(dateObject.format('MMMM'))
  }
  const onNextMonth = () => {
    setNewDateObject(dateObject.add(1, 'month'))
    setCurrentMonth(dateObject.format('MMMM'))
  }
  const onPrevYear = () => {
    setNewDateObject(dateObject.subtract(1, 'year'))
    setCurrentYear(dateObject.format('Y'))
  }
  const onNextYear = () => {
    setNewDateObject(dateObject.add(1, 'year'))
    setCurrentYear(dateObject.format('Y'))
  }

  const blanks = [] // prazna polja pre prvog dana u mesecu
  for (let i = 0; i < Number(firstDayOfMonth()) - 1; i++) {
    blanks.push(<td key={i * -1}>{''}</td>)
  }

  const handleSelectDayExaminations = (day: number) => {
    const date = new Date(`${currentYear} ${currentMonth} ${day}`)
    setTodaysDate(date)
    const newDayExams = thisMonthExams.filter(
      (exam) => new Date(exam.id.dateTime).getDate() === day,
    )
    setChosenDayExams(newDayExams)
    handleOpenModal()
  }

  const handleAddExamForDay = (newExams: ExaminationType[]) => {
    setNewExaminations((prev) => [...(prev as ExaminationType[]), ...newExams])
  }
  const handleDeleteExamForDay = (deletedExam: ExaminationType) => {
    setNewExaminations((prev) =>
      prev?.filter((exam) => exam.id.dateTime !== deletedExam.id.dateTime),
    )
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const daysInMonthValues: JSX.Element[] = [] // broj dana u mesecu
  for (let day = 1; day <= daysInMonth(); day++) {
    const Day =
      day !== Number(currentDay()) ? (
        <div>{day}</div>
      ) : (
        <TodayNumber>{day}</TodayNumber>
      )
    const isDayAvailable =
      thisMonthExams.filter(
        (exam) => new Date(exam?.id.dateTime).getDate() === day,
      ).length < 17
    daysInMonthValues.push(
      <DayTableCell key={day} onClick={() => handleSelectDayExaminations(day)}>
        <DayTableCellContent>
          <DayHeader
            backgroundColor={isDayAvailable ? colors.blue : colors.red}
          >
            {isDayAvailable ? 'Available' : 'Busy'}
            {Day}
          </DayHeader>
        </DayTableCellContent>
      </DayTableCell>,
    )
  }

  // UKUPAN BROJ MESTA NA KALENDARU
  const totalSlots = [...blanks, ...daysInMonthValues]
  const days: JSX.Element[][] = []
  let cells: JSX.Element[] = []
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row) // if index not equal 7 that means not go to next week
    } else {
      days.push(cells) // when reach next week we contain all td in last week to days
      cells = [] // empty container
      cells.push(row) // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      days.push(cells) // when end loop we add remain date
    }
  })
  days.shift()

  return (
    <>
      {openModal && (
        <DayModal
          type={type}
          onClose={handleCloseModal}
          onAddExamForDay={handleAddExamForDay}
          onDeleteExamForDay={handleDeleteExamForDay}
          examinations={chosenDayExams}
          todaysDate={todaysDate}
          doctor={doctor}
          hospital={hospital}
        />
      )}
      <CalendarContainer>
        <Header>
          <div onClick={onPrevMonth}>{LeftArrow}</div>
          <div onClick={toggleShowMonthTable}>{currentMonth}</div>
          <div onClick={onNextMonth}>{RightArrow}</div>
          <div onClick={onPrevYear}>{LeftArrow}</div>
          <div onClick={toggleShowYearTable}>{currentYear}</div>
          <div onClick={onNextYear}>{RightArrow}</div>
        </Header>
        {showYearTable && (
          <YearTable
            year={currentYear}
            onShowYearTable={toggleShowYearTable}
            dateObject={dateObject}
            onSetDateObject={setNewDateObject}
          />
        )}
        {showMonthTable && (
          <MonthList
            data={moment.months()}
            dateObject={dateObject}
            onToggleMonthTable={toggleShowMonthTable}
            onSetDateObject={setNewDateObject}
          />
        )}
        {showDateTable && (
          <KalendarContent>
            <TableHeader>
              <tr>
                {weekdayshort.map((day) => (
                  <TableSubHeader key={day}>{day}</TableSubHeader>
                ))}
              </tr>
            </TableHeader>
            <tbody>
              {days.map((day, index) => (
                <tr key={index}>{day}</tr>
              ))}
            </tbody>
          </KalendarContent>
        )}
      </CalendarContainer>
    </>
  )
}

export default Calendar
