import { PatientType } from '../interfaces/dataTypes'

export const data: PatientType[] = [
  {
    id: 1,
    name: 'nikola nikola1',
    jmbg: '12345678912399',
  },
  {
    id: 2,
    name: 'nikola nikola1',
    jmbg: '1234567899123',
  },
  {
    id: 3,
    name: 'nikola nikola1',
    jmbg: '1234567899456',
  },
  {
    id: 4,
    name: 'nikola nikola1',
    jmbg: '1234567899785',
  },
  {
    id: 5,
    name: 'nikola nikola1',
    jmbg: '12345678997895',
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
