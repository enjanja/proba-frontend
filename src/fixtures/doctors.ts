import { DoctorType } from '../interfaces/dataTypes'

export const data: DoctorType[] = [
  {
    id: '1',
    username: 'cveta',
    password: 'nikola1',
    name: 'nikola nikola1',
    role: 2,
    active: true,
    examinations: [],
    specialization: { id: 1, name: 'Mladi Doktor' },
    hospitals: [
      {
        address: 'adresa 1 Kurac Palac',
        name: 'Bolnica 1 ',
        id: 1,
      },
      {
        address: 'adresa 2',
        name: 'Bolnica 2',
        id: 2,
      },
    ],
  },
  {
    id: '2',
    username: 'cveta',
    name: 'cveta cveta',
    specialization: { id: 1, name: 'Mladi Doktor' },
  },
  {
    id: '3',
    username: 'cvetanija',
    name: 'cvetanija cvetanija',
    specialization: { id: 1, name: 'Mladi Doktor' },
  },
  {
    id: '4',
    username: 'sanja',
    name: 'sanja sanja',
    specialization: { id: 1, name: 'Mladi Doktor' },
  },
]

export interface HeadCellDoctor {
  id: keyof DoctorType
  label: string
  numeric: boolean
}

export const headCellsDoctors: HeadCellDoctor[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Full name',
  },
  {
    id: 'username',
    numeric: false,
    label: 'Username',
  },
  {
    id: 'specialization',
    numeric: false,
    label: 'Specialization',
  },
  {
    id: 'active',
    numeric: false,
    label: '',
  },
]
