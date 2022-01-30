import { TextareaAutosize } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { colors } from '../../global.styles'
import {
  ExaminationType,
  UpdateDiagnosisData,
} from '../../interfaces/dataTypes'
import examinationService from '../../services/examinationService'
import { Button, ButtonSecondary } from '../button/button.styles'
import {
  AddExaminationContainer,
  ButtonDivider,
  ButtonDividerInner,
} from '../form/form.styles'
import { UpdateDiagnosisAcentText, H3 } from '../text/text.styles'

interface UpdateDiagnosisProps {
  type: number
  examination: ExaminationType
  onCancel: () => void
  onDelete: (examination: ExaminationType) => void
  onUpdate: (newExamination: UpdateDiagnosisData) => void
}

const UpdateDiagnosis = ({
  type,
  examination,
  onCancel,
  onUpdate,
  onDelete,
}: UpdateDiagnosisProps) => {
  const [isEditable, setisEditable] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { register, getValues, setValue } = useForm({})
  setValue('diagnosis', examination.diagnosis)

  const handleEnableDiagnosisEdit = () => {
    setisEditable(true)
  }
  const handleOpenDelete = () => {
    setOpenDelete((prev) => !prev)
  }

  const handleUpdate = () => {
    if (
      getValues('diagnosis') === '' ||
      getValues('diagnosis') === examination.diagnosis
    ) {
      setisEditable(false)
      return
    }

    const newExamination: UpdateDiagnosisData = {
      doctorId: examination.id.doctorId,
      patientId: examination.id.patientId,
      dateTime: examination.id.dateTime,
      diagnosis: getValues('diagnosis'),
    }

    examinationService
      .updateDiagnosis(newExamination)
      .then((res) => {
        onUpdate(newExamination)
        toast.success(res.data)
      })
      .catch((err) => toast.error(err.message))
    setisEditable(false)
  }
  const handleDelete = () => {
    if (examination.id.doctorId) {
      examinationService
        .deleteExamination(
          examination.id.doctorId,
          examination.id.patientId,
          examination.id.dateTime,
        )
        .then(() => {
          onDelete(examination)
          onCancel()
          toast.success('Examination was deleted')
        })
        .catch((err) => toast.error(err.message))
    }
  }

  return (
    <AddExaminationContainer>
      <H3>Appointment data</H3>
      <UpdateDiagnosisAcentText>
        Doctor: <span>Dr {examination.doctor.name} </span>
      </UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>
        Patient: <span>{examination.patient.name}</span>
      </UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>
        Date: <span>{new Date(examination.id.dateTime).toLocaleString()}</span>
      </UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>Diagnosis:</UpdateDiagnosisAcentText>
      <TextareaAutosize
        disabled={!isEditable}
        minRows={5}
        {...register('diagnosis')}
        style={{ width: '100%', marginTop: '10px' }}
      />
      {!isEditable && (
        <ButtonSecondary
          onClick={handleEnableDiagnosisEdit}
          color={colors.primary}
        >
          Edit diagnosis
        </ButtonSecondary>
      )}
      {isEditable && (
        <ButtonSecondary onClick={handleUpdate}>Update</ButtonSecondary>
      )}
      {!openDelete && type === 1 && (
        <ButtonSecondary onClick={handleOpenDelete}>Delete</ButtonSecondary>
      )}
      {openDelete && type === 1 && (
        <ButtonDivider>
          <ButtonDividerInner>
            <Button color={colors.secondary} onClick={handleOpenDelete}>
              No
            </Button>
          </ButtonDividerInner>

          <ButtonDividerInner>
            <Button color={colors.danger} onClick={handleDelete}>
              Yes
            </Button>
          </ButtonDividerInner>
        </ButtonDivider>
      )}
      <ButtonSecondary onClick={onCancel} color={colors.secondaryDisabled}>
        Close
      </ButtonSecondary>
    </AddExaminationContainer>
  )
}

export default UpdateDiagnosis
