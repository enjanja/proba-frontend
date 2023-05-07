import { useEffect, useState } from 'react'
import {
  DoctorType,
  ExaminationType,
  ExaminationTypeForAxios,
  HospitalType,
  UpdateDiagnosisData,
} from '../../../interfaces/dataTypes'
import AddExamination from '../../examinations/addExamination'
import UpdateDiagnosis from '../../examinations/updateDiagnosis'
import Modal from '../../modal/Modal'
import { ColumnContainer, ModalContainer } from './calendarModal.styles'
import TimeTableRow from './timeTableRow'

interface DayModalProps {
  onAddExamForDay: (newExams: ExaminationType[]) => void
  onDeleteExamForDay: (deletedExam: ExaminationType) => void
  onClose: () => void
  examinations: ExaminationType[]
  todaysDate: Date | null
  doctor: DoctorType | null
  hospital: HospitalType | null
  type: number
}

const DayModal = ({
  type,
  examinations,
  todaysDate,
  doctor,
  hospital,
  onClose,
  onAddExamForDay,
  onDeleteExamForDay,
}: DayModalProps) => {  
  const [showAddExamDialog, setshowAddExamDialog] = useState(false)
  const [showUpdateDiagnosisDialog, setUpdateDiagnosisDialog] = useState(false)
  const [interval, setInterval] = useState('')
  const [updatedExaminations, setUpdatedExaminations] = useState<
    ExaminationType[]
  >(examinations)
  const [newExaminations, setNewExaminations] = useState<ExaminationType[]>([])
  const [
    chosenExamination,
    setChosenExamination,
  ] = useState<ExaminationType | null>(null)

  const generateTimeIntervals = (step: number) => {
    const date = new Date(2020, 0, 1, 8)
    const intervals = []
    while (date.toLocaleTimeString() !== '4:30:00 PM') {
      intervals.push(date.toLocaleTimeString('en-GB'))
      date.setMinutes(date.getMinutes() + step)
    }
    return intervals
  }
  const intervals = generateTimeIntervals(30)

  const openAddExamDialog = () => {
    setshowAddExamDialog(true)
    setUpdateDiagnosisDialog(false)
  }

  const handleSetInterval = (value: string) => {
    openAddExamDialog()
    setInterval(value)
  }

  const handleCloseDayModal = () => {
    onAddExamForDay(newExaminations)
    onClose()
  }

  const handleSelectExamination = (examination: ExaminationType) => {
    setChosenExamination(examination)
    setUpdateDiagnosisDialog(true)
    setshowAddExamDialog(false)
  }

  const handleCancelEditDiagnosis = () => {
    setUpdateDiagnosisDialog(false)
  }

  useEffect(() => {}, [updatedExaminations])

  const handleCreate = (newExam: ExaminationTypeForAxios) => {
    setNewExaminations((prev) => [...prev, newExam])
    setUpdatedExaminations((prev) => [...prev, newExam])
  }

  const handleUpdate = (updatedExam: UpdateDiagnosisData) => {
    const newExams: ExaminationType[] = []
    updatedExaminations.map((exam) => {
      if (
        exam.id.doctorId === updatedExam.doctorId &&
        exam.id.patientId === updatedExam.patientId &&
        exam.id.dateTime === updatedExam.dateTime
      ) {
        exam.diagnosis = updatedExam.diagnosis
      }
      newExams.push(exam)
    })
    setUpdatedExaminations(newExams)
  }

  const handleDelete = (deletedExam: ExaminationType) => {
    setUpdatedExaminations((prev) =>
      prev.filter((exam) => exam.id.dateTime !== deletedExam.id.dateTime),
    )

    onDeleteExamForDay(deletedExam)
  }

  const showUpdateExamDialog = showUpdateDiagnosisDialog && chosenExamination

  return (
    <Modal onClose={handleCloseDayModal}>
      <ModalContainer>
        <ColumnContainer>
          {intervals.map((i) => {
            const examination = updatedExaminations.find((exam) => {
              const time = exam?.id.dateTime.substring(
                exam.id.dateTime.indexOf('T') + 1,
                exam.id.dateTime.lastIndexOf(':') + 3,
              )
              if (time.trim() === i) return exam
            })
            return (
              <TimeTableRow
                type={type}
                key={i}
                examination={examination}
                interval={i}
                isSelected={interval === i}
                onSetInterval={handleSetInterval}
                onSetChosenExam={handleSelectExamination}
              />
            )
          })}
        </ColumnContainer>
        <ColumnContainer>
          <h3>
            {`${todaysDate?.toDateString()} at 
            ${interval.slice(0, interval.lastIndexOf(':'))}`}
          </h3>
          {showUpdateExamDialog || showAddExamDialog ? null : (
            <p>Please select a time slot</p>
          )}
          {showAddExamDialog && (
            <AddExamination
              onCreate={handleCreate}
              onClose={() => setshowAddExamDialog(false)}
              doctor={doctor}
              hospital={hospital}
              date={todaysDate}
              interval={interval}
            />
          )}
          {showUpdateExamDialog && (
            <UpdateDiagnosis
              type={type}
              onUpdate={handleUpdate}
              examination={chosenExamination}
              onCancel={handleCancelEditDiagnosis}
              onDelete={handleDelete}
            />
          )}
        </ColumnContainer>
      </ModalContainer>
    </Modal>
  )
}

export default DayModal
