import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
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
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { DeleteAll, userDelete } from '../Store/personalDetails/action';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const columns = [
  { id: 'firstName', label: 'Name', minWidth: 100 },
  { id: 'designation', label: 'Designation', minWidth: 100 },
  { id: 'department', label: 'Department', minWidth: 100 },
];

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);
  const [userData, setUserData] = useState(Response.employeeFormResponce);
  const [filterData, setFilterData] = useState(Response.employeeFormResponce);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(Response.employeeFormResponce)
  }, [Response?.employeeFormResponce])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      let newData = filterData.filter(item => item.firstName.toLowerCase().includes(text.toLowerCase())
        || item.designation.toLowerCase().includes(text.toLowerCase()) ||
        item.department.toLowerCase().includes(text.toLowerCase()))
      setUserData(newData);
      setSearch(text);
    } else {
      setUserData(filterData);
      setSearch(text);
    }
  };

  const handleCellClick = (e) => {
    history.push({
      pathname: '/employee-form',
      state: { data: e.target.textContent, submit: location?.state?.data }
    })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>Albiorix Technology Team</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8}>
            <TextField id="outlined-search" label="Search field" type="search" variant="outlined" style={{ right: 200 }}
              value={search}
              onChange={(e) => searchFilterFunction(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div >
              <Tooltip title="Add User" aria-label="add">
                <IconButton aria-label="add">
                  <AddBoxIcon variant="contained" color="primary"
                    style={{ fontSize: '40px' }}
                    onClick={() => { history.push('/employee-form') }} />
                </IconButton>
              </Tooltip>
              {userData.length > 0 &&
                <Tooltip title="Delete" aria-label="delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      style={{ fontSize: '40px' }}
                      onClick={(e) => dispatch(DeleteAll())}
                      variant="contained" color="secondary"
                    />
                  </IconButton>
                </Tooltip>}
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: 10 }}>
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
                          <TableCell key={column.id} align={column.align} onClick={(e) => handleCellClick(e)}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>

                        );
                      })}
                      <div>
                        <Tooltip title="Edit" aria-label="edit">
                          <IconButton aria-label="edit">
                            <EditIcon
                              variant="contained" color="primary" onClick={(e) => history.push({
                                pathname: '/employee-edit',
                                state: { user: row }
                              })} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" aria-label="delete">
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              className={classes.button}
                              variant="contained" color="secondary"
                              onClick={(e) => dispatch(userDelete(row))}
                              variant="contained" color="secondary"
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
  title: {
    fontSize: 18,
    fontFamily: 700,
    color: 'black'
  },
  button: {
    margin: '2px',
  }
});

export default Dashboard