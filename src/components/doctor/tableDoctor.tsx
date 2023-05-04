import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
import EnhancedTableHead from '../tableHead/tableHead'
import { DoctorType } from '../../interfaces/dataTypes'
import { headCellsDoctors } from '../../fixtures/doctors'
import { FiUserX } from 'react-icons/fi'
import { TableCellContent } from '../layout/layout.styles'

const TableDoctors = ({
  doctors,
  onDeactivate,
}: {
  doctors: DoctorType[]
  onDeactivate: (doctor: DoctorType) => void
}) => {
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

  const noOfPages: number = doctors.length % rowsPerPage

  const maxRows = noOfPages * rowsPerPage
  const missingRows = maxRows - doctors.length

  const missingRowsArray = []
  if (noOfPages - 1 === page) {
    for (let i = 0; i < missingRows; i++) {
      missingRowsArray.push(i)
    }
  }

  return (
    <>
      <TableContainer
        sx={{
          overflow: 'scroll',
          border: '1px solid black',
          borderRadius: '5px',
          width: '90%',
          height: '550px',
        }}
      >
        <Table stickyHeader>
          <EnhancedTableHead header={headCellsDoctors} />
          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => {
                return (
                  <TableRow key={doctor.id} sx={{ height: '55px' }} hover>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.username}</TableCell>
                    <TableCell>{doctor.specialization.name}</TableCell>
                    {doctor.active ? (
                      <TableCell onClick={() => onDeactivate(doctor)}>
                        <TableCellContent>
                          {'Active'}
                          <FiUserX />
                        </TableCellContent>
                      </TableCell>
                    ) : (
                      <TableCell>Deactivated</TableCell>
                    )}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableDoctors
