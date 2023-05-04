import { ExaminationType } from '../interfaces/dataTypes'

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
