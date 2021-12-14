import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import { colors } from '../../../global.styles'
import { DoctorType } from '../../../interfaces/dataTypes'

interface HeadCell {
  id: keyof DoctorType
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'fullName',
    numeric: false,
    label: 'Full name',
  },
  {
    id: 'username',
    numeric: false,
    label: 'Username',
  },
  {
    id: 'password',
    numeric: false,
    label: 'Password',
  },
  {
    id: 'specialization',
    numeric: false,
    label: 'Specialization',
  },
  {
    id: 'hospitals',
    numeric: false,
    label: 'Works in',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{ color: colors.base, backgroundColor: colors.secondary }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ color: colors.base, backgroundColor: colors.secondary }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell sx={{ backgroundColor: colors.secondary }} />
        <TableCell sx={{ backgroundColor: colors.secondary }} />
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
