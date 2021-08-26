import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'designation', label: 'Designation', minWidth: 100 },
  { id: 'department', label: 'Department', minWidth: 100 },
];

function createData(name, designation, department) {
  return { name, designation, department };
}

const rows = [
  createData('Arnold Charels', 'Ful-stack Developer', 'Development'),
  createData('Syvla Chritian', 'Backend Developer', 'Frontend Development'),
  createData('Chet Smith', 'Frontend Engineer', 'Management'),
  createData('United States', 'Administrator', 'Finance'),
  createData('Jhon Careter', 'Associate', 'Backend'),
  createData('Rout Limmans', 'Backend Developer', 'Development'),
  createData('Jhony Depp', 'Ful-stack Developer', 'Development'),
  createData('Strest Mann', 'Associate', 'Development'),
  createData('Meisha Saint', 'Backend Developer', 'Management'),
  createData('Joacb jenn', 'Frontend Engineer', 'Management'),
  createData('Lucy Feran', 'Ful-stack Developer', 'Finance'),
  createData('Mce Ribabm', 'GB', 'Frontend Development'),
  createData('Nulla Donen', 'Backend Developer', 'Backend'),
  createData('Muris Javed', 'Administrator', 'Finance'),
  createData('Zara vomen', 'Associate', 'Frontend Development'),
];

const Dashboard = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState(rows);
  const [filterData, setFilterData] = useState(rows);

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      let newData = filterData.filter(item => item.name.toLowerCase().includes(text.toLowerCase()) 
      || item.designation.toLowerCase().includes(text.toLowerCase()) ||
       item.department.toLowerCase().includes(text.toLowerCase()))
      setUserData(newData);
      setSearch(text);
    } else {
      setUserData(rows);
      setSearch(text);
    }
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>Albiorix Technology Team</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField id="outlined-search" label="Search field" type="search" variant="outlined" style={{ right: 200 }}
              value={search}
              onChange={(e) => searchFilterFunction(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" style={{ left: 200 }}
              onClick={() => { history.push('/employee-form') }}>Add</Button>
          </Grid>
        </Grid>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card >
  )
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    fontFamily: 700,
    color: 'black'
  },
  pos: {
    marginBottom: 12,
  },
});
export default Dashboard