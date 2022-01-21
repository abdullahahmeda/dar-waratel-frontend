import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTable, useSortBy, usePagination } from 'react-table'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'

export default function DataTable ({
  data,
  columns,
  pagination,
  actions,
  deleteAction,
  ...rest
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      data,
      columns
    },
    useSortBy,
    usePagination
  )

  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value))
    gotoPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('label')}
                        {column.isSorted ? (
                          <Box component='span' sx={visuallyHidden}>
                            {column.isSortedDesc
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  {actions && <TableCell align='right'>الإجراءات</TableCell>}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {(pagination ? page : rows).map(row => {
                prepareRow(row)
                return (
                  <TableRow hover {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell align='right'>
                        {actions(row.original, row.id)}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={pageSize}
            page={pageIndex}
            onPageChange={(event, newPage) => gotoPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='عدد الصفوف لكل صفحة:'
            labelDisplayedRows={({ from, to, count, page }) =>
              `الصفحة رقم ${page + 1} من ${Math.ceil(pageCount)}`
            }
          />
        )}
      </Paper>
    </Box>
  )
}
