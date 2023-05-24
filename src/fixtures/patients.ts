import { PatientType } from '../interfaces/dataTypes'

export interface HeadCellPatient {
  id: keyof PatientType | 'edit'
  label: string
  numeric: boolean
  width: string
}

export const headCellsPatients: HeadCellPatient[] = [
  {
    id: 'id',
    numeric: false,
    label: 'ID',
    width: '10%',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Full name',
    width: '30%',
  },
  {
    id: 'jmbg',
    numeric: false,
    label: 'JMBG',
    width: '30%',
  },
  {
    id: 'lbo',
    numeric: false,
    label: 'LBO',
    width: '20%',
  },
]
