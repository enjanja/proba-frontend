/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri'
import moment from 'moment'
import './calendar.css'
import YearTable from './yearTable'
import MonthList from './monthTable'
import {
  DoctorType,
  ExaminationType,
  HospitalType,
} from '../../interfaces/dataTypes'
import {
  BlankDay,
  Busyness,
  CalendarContainer,
  Cell1,
  Day,
  DayNames,
  DayNumber,
  Days,
  Header,
  Kalendar,
  KalendarContent,
  TodayNumber,
} from './calendar.styles'
import DayModal from './calendarModals/dayModal'
import { colors } from '../../global.styles'

interface CalendarProps {
  type: number
  doctor: DoctorType | null
  hospital: HospitalType | null
  examinations: ExaminationType[] | undefined
}

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
      return
    }
    setShowYearTable((prev) => !prev)
    setShowDateTable((prev) => !prev)
  }
  const toggleShowMonthTable = () => {
    if (showYearTable) {
      return
    }
    setShowMonthTable((prev) => !prev)
    setShowDateTable((prev) => !prev)
  }

  const onPrevMonth = () => {
    setNewDateObject(dateObject.subtract(1, 'month'))
    setCurrentMonth(dateObject.format('MMMM'))
  }
  const onPrevYear = () => {
    setNewDateObject(dateObject.subtract(1, 'year'))
    setCurrentYear(dateObject.format('Y'))
  }
  const onNextMonth = () => {
    setNewDateObject(dateObject.add(1, 'month'))
    setCurrentMonth(dateObject.format('MMMM'))
  }
  const onNextYear = () => {
    setNewDateObject(dateObject.add(1, 'year'))
    setCurrentYear(dateObject.format('Y'))
  }

  const weekdayshortname = weekdayshort.map((day) => {
    return <th key={day}>{day}</th>
  })

  const blanks = [] // prazna polja pre prvog dana u mesecu
  for (let i = 0; i < Number(firstDayOfMonth()) - 1; i++) {
    blanks.push(<BlankDay key={i * -1}>{''}</BlankDay>)
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
    setNewExaminations(
      (prev) =>
        prev &&
        prev.filter((exam) => exam.id.dateTime !== deletedExam.id.dateTime),
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
    daysInMonthValues.push(
      <Cell1 onClick={() => handleSelectDayExaminations(day)}>
        {day !== Number(currentDay()) ? (
          <DayNumber>{day}</DayNumber>
        ) : (
          <TodayNumber>{day}</TodayNumber>
        )}
        <Day key={day}>
          {thisMonthExams.filter((exam) => {
            if (new Date(exam?.id.dateTime).getDate() === day) return true
          }).length >= 17 ? (
            <Busyness color={colors.danger}>Busy</Busyness>
          ) : (
            <Busyness color={colors.primary}>Available</Busyness>
          )}
        </Day>
      </Cell1>,
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
          <div onClick={onPrevMonth}>
            <RiArrowLeftSFill size="30px" />
          </div>
          <div onClick={toggleShowMonthTable}>{currentMonth}</div>
          <div onClick={onNextMonth}>
            <RiArrowRightSFill size="30px" />
          </div>
          <div onClick={onPrevYear}>
            <RiArrowLeftSFill size="30px" />
          </div>
          <div onClick={toggleShowYearTable}>{currentYear}</div>
          <div onClick={onNextYear}>
            <RiArrowRightSFill size="30px" />
          </div>
        </Header>

        <Kalendar>
          {showYearTable && (
            <YearTable
              year={currentYear}
              onShowYearTable={toggleShowYearTable}
              dateObject={dateObject}
              onSetDateObject={setNewDateObject}
              onSetShowMonthTable={toggleShowMonthTable}
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
        </Kalendar>

        {showDateTable && (
          <Kalendar>
            <KalendarContent>
              <DayNames>
                <tr>{weekdayshortname}</tr>
              </DayNames>
              <tbody>
                {days.map((day, i) => {
                  return <Days key={i}>{day}</Days>
                })}
              </tbody>
            </KalendarContent>
          </Kalendar>
        )}
      </CalendarContainer>
    </>
  )
}

export default Calendar
