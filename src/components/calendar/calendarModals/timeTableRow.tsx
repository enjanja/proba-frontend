import { ExaminationType } from '../../../interfaces/dataTypes'
import { MdOutlineAddBox, MdEditCalendar } from 'react-icons/md'
import {
  AppointmentSlot,
  AppointmentSlotBottom,
  Patient,
  Time,
} from './calendarModal.styles'

interface TimeTableRowProps {
  type: number
  interval: string
  isSelected: boolean
  examination: ExaminationType | undefined
  onSetInterval: (value: string) => void
  onSetChosenExam: (value: ExaminationType) => void
}

const TimeTableRow = ({
  type,
  interval,
  isSelected,
  examination,
  onSetInterval,
  onSetChosenExam,
}: TimeTableRowProps) => {
  const handleAddExamination = (interval: string) => {
    onSetInterval(interval)
  }

  const handleEditDiagnosis = (value: ExaminationType, interval: string) => {
    onSetInterval(interval)
    onSetChosenExam(value)
  }

  const ApointmentSlotContainer =
    interval === '16:00:00' ? AppointmentSlotBottom : AppointmentSlot

  return (
    <ApointmentSlotContainer key={interval} isSelected={isSelected}>
      <Time>{interval}</Time>
      <Patient>
        <div>{examination?.patient.name}</div>
        <div>{examination?.patient.jmbg}</div>
      </Patient>
      <div>
        {!examination && type === 1 && (
          <MdOutlineAddBox
            size="20px"
            onClick={() => handleAddExamination(interval)}
          />
        )}
        {examination && (
          <MdEditCalendar
            size="20px"
            onClick={() => handleEditDiagnosis(examination, interval)}
          />
        )}
      </div>
    </ApointmentSlotContainer>
  )
}

export default TimeTableRow
