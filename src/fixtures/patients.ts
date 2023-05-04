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
    width: '20%',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Full name',
    width: '40%',
  },
  {
    id: 'jmbg',
    numeric: false,
    label: 'JMBG',
    width: '30%',
  },
]
