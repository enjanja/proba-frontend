import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import {
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
import EnhancedTableHead from '../table/tableHead'
import { headCellsPatients } from '../../fixtures/patients'
import { AiFillEdit } from 'react-icons/ai'
import { PatientType } from '../../interfaces/dataTypes'
import { tableStyle } from '../table/table-constants'

interface TablePatientsProps {
  patients: PatientType[]
  onEdit: (patient: PatientType) => void
}

const TablePatients = ({ patients, onEdit }: TablePatientsProps) => {
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

  const EditCell = ({ selectedPatient }: { selectedPatient: PatientType }) => {
    const handleEdit = () => {
      onEdit(selectedPatient)
    }

    return (
      <TableCell onClick={handleEdit} style={{ cursor: 'pointer' }}>
        <AiFillEdit size="17px" />
      </TableCell>
    )
  }

  return (
    <>
      <TableContainer sx={tableStyle}>
        <Table stickyHeader>
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
                    <EditCell selectedPatient={patient} />
                  </TableRow>
                )
              })}
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
