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
import { Hospital, ListContainer } from '../form/form.styles'
import { SmallText } from '../text/text.styles'

const TableDoctors = ({ doctors }: { doctors: DoctorType[] }) => {
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
      <TableContainer sx={{ overflow: 'scroll', height: '400px' }}>
        <Table size="small" stickyHeader>
          <EnhancedTableHead header={headCellsDoctors} />
          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => {
                doctor['hospitals'] = [
                  { id: 1, name: 'Jove Ilica 150/2', address: 'adss' },
                  { id: 2, name: 'Dusana Radovica 14b', address: 'adss' },
                ]
                return (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.username}</TableCell>
                    <TableCell>{doctor.specialization.name}</TableCell>
                    <TableCell>
                      <ListContainer>
                        {doctor.hospitals &&
                          doctor.hospitals.map((item) => (
                            <SmallText key={item.id}>{item.name}</SmallText>
                          ))}
                      </ListContainer>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableDoctors
