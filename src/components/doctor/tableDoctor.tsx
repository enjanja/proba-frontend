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
import { DoctorType } from '../../interfaces/dataTypes'
import { headCellsDoctors } from '../../fixtures/doctors'
import { FiUserX } from 'react-icons/fi'

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

  const handleDeactivate = (doctor: DoctorType) => {
    onDeactivate(doctor)
  }

  return (
    <>
      <TableContainer sx={{ overflow: 'scroll', height: '415px' }}>
        <Table size="small" stickyHeader>
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
                    <TableCell
                      onClick={() => handleDeactivate(doctor)}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <FiUserX size="17px" />
                    </TableCell>
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
