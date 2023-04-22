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
import { ButtonDivider, ButtonDividerInner } from '../form/form.styles'
import { UpdateDiagnosisAcentText } from '../text/text.styles'

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

  const handleExportPDF = () => {
    examinationService
      .exportExaminationToPDF(examination.id)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const date = examination.id.dateTime
  const newFormat1 = date.substring(0, date.indexOf('T'))
  const newFormat2 = date.substring(
    date.indexOf('T') + 1,
    date.lastIndexOf(':'),
  )
  const newDate = newFormat1 + ' ' + newFormat2

  return (
    <>
      <UpdateDiagnosisAcentText>
        Doctor: <span>Dr {examination.doctor.name} </span>
      </UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>Patient:</UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>
        Date: <span>{newDate}</span>
      </UpdateDiagnosisAcentText>
      <UpdateDiagnosisAcentText>Diagnosis:</UpdateDiagnosisAcentText>
      <TextareaAutosize
        disabled={!isEditable}
        minRows={5}
        {...register('diagnosis')}
        style={{ width: '100%', marginTop: '10px' }}
      />

      <ButtonDivider>
        <ButtonDividerInner>
          <ButtonSecondary
            onClick={isEditable ? handleUpdate : handleEnableDiagnosisEdit}
            color={isEditable ? colors.secondary : colors.primary}
          >
            {isEditable ? 'Update' : 'Edit'}
          </ButtonSecondary>
        </ButtonDividerInner>
        <ButtonDividerInner>
          <ButtonSecondary
            onClick={handleExportPDF}
            color={colors.secondaryDisabled}
          >
            Export PDF
          </ButtonSecondary>
        </ButtonDividerInner>
      </ButtonDivider>
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
        Cancel
      </ButtonSecondary>
    </>
  )
}

export default UpdateDiagnosis
