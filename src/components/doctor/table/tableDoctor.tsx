import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import {
  Alert,
  Checkbox,
  Grid,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
// import { Box } from '@mui/system'
import EnhancedTableHead from './tableHead'
import { data } from '../../../fixtures/doctors'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import doctorService from '../../../services/doctorService'
import { DoctorType } from '../../../interfaces/dataTypes'
import { colors } from '../../../global.styles'

const TableDoctors = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selected, setSelected] = useState<readonly string[]>([])

  const [doctors, setDoctors] = useState<DoctorType[]>([])
  const jwt = JSON.parse(localStorage.getItem('jwt') || '')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  useEffect(() => {
    doctorService
      .getAllDoctors(jwt)
      .then((res) => {
        setDoctors(res.data)
        console.log(res.data?.message)
      })
      .catch((err) => {
        setError(err.response?.data?.message)
      })
  }, [doctors])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // ovde treba da se stavi da ga po id-u selektuje
      const newSelected = data.map((n) => n.username)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => {
    return selected.indexOf(name) !== -1
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const handleDelete = () => {
    if (selected.length === 0) {
      setError('You must select a doctor')
      return
    }
    // open modal to ask if the nurse wants to delete the doctor
    doctorService
      .deleteDoctor(selected[0])
      .then((res) => setSuccess(res.data?.message))
      .catch((err) => setError(err.response?.data?.message))
  }

  // const handleAlertClose = () => {
  //   setError('')
  // }

  console.log(error)

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {doctors.length > 0 ? (
        <>
          <TableContainer
            sx={{ maxHeight: '500px', minHeight: '300px', overflow: 'scroll' }}
          >
            <Table size="small" stickyHeader sx={{ height: '500px' }}>
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.length}
              />
              <TableBody>
                {doctors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((doctor: DoctorType) => {
                    const isItemSelected = isSelected(doctor.username)
                    return (
                      <TableRow key={doctor.username} hover>
                        <TableCell>
                          <Checkbox
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleClick(event, doctor.username)
                            }
                          />
                        </TableCell>
                        <TableCell>{doctor.fullName}</TableCell>
                        <TableCell>{doctor.username}</TableCell>
                        <TableCell>{doctor.password}</TableCell>
                        <TableCell>{doctor.specialization.name}</TableCell>
                        <TableCell>{doctor.hospitals[0].name}</TableCell>
                        <TableCell>
                          <FaTrashAlt onClick={handleDelete} />
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Grid container direction={'row'} justifyContent={'center'}>
          <h3 style={{ color: colors.secondary }}>
            No doctors currently work with us
          </h3>
        </Grid>
      )}
    </>
  )
}

export default TableDoctors
