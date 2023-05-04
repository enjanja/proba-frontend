import { DoctorType } from '../interfaces/dataTypes'

export interface HeadCellDoctor {
  id: keyof DoctorType
  label: string
  numeric: boolean
  width: string
}

export const headCellsDoctors: HeadCellDoctor[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Full name',
    width: '25%',
  },
  {
    id: 'username',
    numeric: false,
    label: 'Username',
    width: '25%',
  },
  {
    id: 'specialization',
    numeric: false,
    label: 'Specialization',
    width: '30%',
  },
  {
    id: 'active',
    numeric: false,
    label: 'Status',
    width: '20%',
  },
]
