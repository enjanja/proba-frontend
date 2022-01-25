import { ExaminationType } from '../interfaces/dataTypes'

export const data: ExaminationType[] = [
  {
    id: {
      doctorId: '1',
      patientId: '1',
      dateTime: new Date(2022, 1, 15, 12, 30, 0, 0).toISOString(),
    },
    diagnosis: 'Ok je skroz',
    doctor: {
      id: '1',
      username: 'nikola1',
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
    patient: {
      id: '1',
      name: 'nikola nikola1',
      jmbg: '12345678912399',
    },
  },
  {
    id: {
      doctorId: '1',
      patientId: '1',
      dateTime: new Date(2022, 1, 15, 12, 30, 0, 0).toISOString(),
    },
    diagnosis: 'Ok je skroz',
    doctor: {
      id: '1',
      username: 'nikola1',
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
    patient: {
      id: '1',
      name: 'nikola nikola1',
      jmbg: '12345678912399',
    },
  },
  {
    id: {
      doctorId: '1',
      patientId: '1',
      dateTime: new Date('2022-02-15').toISOString(),
    },
    diagnosis: 'Ok je skroz',
    doctor: {
      id: '1',
      username: 'nikola1',
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
    patient: {
      id: '1',
      name: 'nikola nikola1',
      jmbg: '12345678912399',
    },
  },
  {
    id: {
      doctorId: '1',
      patientId: '1',
      dateTime: new Date('2022-02-15').toISOString(),
    },
    diagnosis: 'Ok je skroz',
    doctor: {
      id: '1',
      username: 'nikola1',
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
    patient: {
      id: '1',
      name: 'nikola nikola1',
      jmbg: '12345678912399',
    },
  },
  {
    id: {
      doctorId: '1',
      patientId: '1',
      dateTime: new Date('2022-02-15').toISOString(),
    },
    diagnosis: 'Ok je skroz',
    doctor: {
      id: '1',
      username: 'nikola1',
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
    patient: {
      id: '1',
      name: 'nikola nikola1',
      jmbg: '12345678912399',
    },
  },
]

export interface HeadCellExamination {
  id: keyof ExaminationType | 'edit'
  label: string
  numeric: boolean
}

export const headCellsPatients: HeadCellExamination[] = [
  {
    id: 'id',
    numeric: false,
    label: 'ID',
  },
]
