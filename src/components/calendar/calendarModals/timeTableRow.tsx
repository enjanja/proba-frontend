import { ExaminationType } from '../../../interfaces/dataTypes'
import { MdOutlineAddBox, MdEditCalendar } from 'react-icons/md'
import {
  AppointmentSlot,
  AppointmentSlotBottom,
  Patient,
  Time,
} from './calendarModal.styles'

interface TimeTableRowProps {
  interval: string
  examination: ExaminationType | undefined
  onSetInterval: (value: string) => void
  onSetChosenExam: (value: ExaminationType) => void
}

const TimeTableRow = ({
  interval,
  examination,
  onSetInterval,
  onSetChosenExam,
}: TimeTableRowProps) => {
  const handleAddExamination = (value: string) => {
    onSetInterval(value)
  }

  const handleEditDiagnosis = (value: ExaminationType) => {
    onSetChosenExam(value)
  }

  return (
    <>
      {interval === '16:00:00' && (
        <AppointmentSlotBottom key={interval}>
          <Time>{interval}</Time>
          <Patient>
            <div>{examination?.patient.name}</div>
            <div>{examination?.patient.jmbg}</div>
          </Patient>
          <div>
            {!examination && (
              <MdOutlineAddBox
                size="20px"
                onClick={() => handleAddExamination(interval)}
              />
            )}
            {examination && (
              <MdEditCalendar
                size="20px"
                onClick={() => handleEditDiagnosis(examination)}
              />
            )}
          </div>
        </AppointmentSlotBottom>
      )}
      {interval !== '16:00:00' && (
        <AppointmentSlot key={interval}>
          <Time>{interval}</Time>
          <Patient>
            <div>{examination?.patient.name}</div>
            <div>{examination?.patient.jmbg}</div>
          </Patient>
          <div>
            {!examination && (
              <MdOutlineAddBox
                size="20px"
                onClick={() => handleAddExamination(interval)}
              />
            )}
            {examination && (
              <MdEditCalendar
                size="20px"
                onClick={() => handleEditDiagnosis(examination)}
              />
            )}
          </div>
        </AppointmentSlot>
      )}
    </>
  )
}

export default TimeTableRow
