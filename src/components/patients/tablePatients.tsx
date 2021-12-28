import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import {
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
import EnhancedTableHead from '../tableHead/tableHead'
import { headCellsPatients } from '../../fixtures/patients'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { PatientType } from '../../interfaces/dataTypes'

const TablePatients = ({ patients }: { patients: PatientType[] }) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0

  return (
    <>
      <TableContainer sx={{ overflow: 'scroll', height: '400px' }}>
        <Table size="small" stickyHeader>
          <EnhancedTableHead header={headCellsPatients} />
          <TableBody>
            {patients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((patient: PatientType) => {
                return (
                  <TableRow key={patient.id} hover sx={{ height: '55px' }}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.jmbg}</TableCell>
                    <TableCell>
                      <FaTrashAlt />
                    </TableCell>
                    <TableCell>
                      <FaEdit />
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TablePatients
