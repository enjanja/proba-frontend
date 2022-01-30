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
import {
  ColumnContainer,
  ModalContainer,
  RowContainer,
  TimeTableContainer,
} from './calendarModal.styles'
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

  const handleOpenAddExam = () => {
    setshowAddExamDialog(!showAddExamDialog)
    setUpdateDiagnosisDialog(false)
  }

  const handleSetInterval = (value: string) => {
    handleOpenAddExam()
    setInterval(value)
  }

  const handleCloseDayModal = () => {
    onAddExamForDay(newExaminations)
    onClose()
  }

  const handleSelectExamination = (newExam: ExaminationType) => {
    setChosenExamination(newExam)
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

  return (
    <Modal onClose={handleCloseDayModal}>
      <ModalContainer>
        <RowContainer>
          <ColumnContainer>
            <TimeTableContainer>
              {intervals.map((a) => {
                const examination = updatedExaminations.find((e) => {
                  const time = e?.id.dateTime.substring(
                    e.id.dateTime.indexOf('T') + 1,
                    e.id.dateTime.lastIndexOf(':') + 3,
                  )
                  if (time.trim() === a) return e
                })

                return (
                  <TimeTableRow
                    type={type}
                    key={a}
                    examination={examination}
                    interval={a}
                    onSetInterval={handleSetInterval}
                    onSetChosenExam={handleSelectExamination}
                  />
                )
              })}
            </TimeTableContainer>
          </ColumnContainer>
          <ColumnContainer>
            {showAddExamDialog && (
              <AddExamination
                onCreate={handleCreate}
                onClose={handleOpenAddExam}
                doctor={doctor}
                hospital={hospital}
                date={todaysDate}
                interval={interval}
              />
            )}
            {showUpdateDiagnosisDialog && chosenExamination && (
              <UpdateDiagnosis
                type={type}
                onUpdate={handleUpdate}
                examination={chosenExamination}
                onCancel={handleCancelEditDiagnosis}
                onDelete={handleDelete}
              />
            )}
          </ColumnContainer>
        </RowContainer>
      </ModalContainer>
    </Modal>
  )
}

export default DayModal
