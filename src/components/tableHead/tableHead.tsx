import { TableCell, TableHead, TableRow } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { HeadCellDoctor } from '../../fixtures/doctors'
import { HeadCellPatient } from '../../fixtures/patients'
import { colors } from '../../global.styles'

type HeadCell = HeadCellDoctor | HeadCellPatient

interface EnhancedTableProps {
  header: HeadCell[]
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { header } = props
  const location = useLocation()

  return (
    <TableHead>
      <TableRow>
        {header.map((headCell) => (
          <TableCell
            sx={{ color: colors.base, backgroundColor: colors.secondary }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
        {location.pathname !== '/nurse/doctors' ? (
          <>
            <TableCell sx={{ backgroundColor: colors.secondary }} />
          </>
        ) : null}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
