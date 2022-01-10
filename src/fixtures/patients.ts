import { PatientType } from '../interfaces/dataTypes'

export const data: PatientType[] = [
  {
    id: '1',
    name: 'nikola nikola1',
    jmbg: '12345678912399',
  },
]

export interface HeadCellPatient {
  id: keyof PatientType
  label: string
  numeric: boolean
}

export const headCellsPatients: HeadCellPatient[] = [
  {
    id: 'id',
    numeric: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Full name',
  },
  {
    id: 'jmbg',
    numeric: false,
    label: 'JMBG',
  },
]
