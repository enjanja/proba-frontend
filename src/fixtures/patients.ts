import { PatientType } from '../interfaces/dataTypes'

export const data: PatientType[] = [
  {
    id: '1',
    name: 'nikola nikola1',
    jmbg: '12345678912399',
  },
  {
    id: '2',
    name: 'nikola2a nikola2',
    jmbg: '12345678912399',
  },
  {
    id: '3',
    name: 'nikola2 nikadola2',
    jmbg: '12345678912399',
  },
  {
    id: '4',
    name: 'nikasdola nikola1',
    jmbg: '12345678912399',
  },
  {
    id: '5',
    name: 'nikola2 nikodaddla2',
    jmbg: '12345678912399',
  },
  {
    id: '6',
    name: 'nadsddaikola2 nikola2',
    jmbg: '12345678912399',
  },
]

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
