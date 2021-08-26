import React, { useEffect, useReducer } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { currentStatusSuccess } from '../Store/personalDetails/action';

const CurrentStatusComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  useEffect(() => {
    if (isRemove) {
      setFormInput({ compnay: "", designation: "", department: '', ctc: '', workingDate: '' })
    }
  }, [isRemove])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      compnay: "",
      designation: "",
      department: '',
      ctc: '',
      workingDate: ''
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    setValue([formInput]);
    dispatch(currentStatusSuccess(formInput))
  };

  return (
    <div>
      <Typography>Current Status</Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.main} >
          <div>
            <TextField
              id="compnay"
              label="Compnay"
              name="compnay"
              defaultValue={Response.currentStatusResponce?.compnay ? Response.currentStatusResponce.compnay : formInput.compnay}
              value={Response.currentStatusResponce?.compnay ? Response.currentStatusResponce.compnay : formInput.compnay}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="designation"
              label="Designation"
              name="designation"
              defaultValue={Response.currentStatusResponce?.designation ? Response.currentStatusResponce.designation : formInput.designation}
              value={Response.currentStatusResponce?.designation ? Response.currentStatusResponce.designation : formInput.designation}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="department"
              label="Department"
              name="department"
              defaultValue={Response.currentStatusResponce?.department ? Response.currentStatusResponce.department : formInput.department}
              value={Response.currentStatusResponce?.department ? Response.currentStatusResponce.department : formInput.department}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="ctc"
              label="CTC"
              type="number"
              name="ctc"
              defaultValue={Response.currentStatusResponce?.ctc ? Response.currentStatusResponce.ctc : formInput.ctc}
              value={Response.currentStatusResponce?.ctc ? Response.currentStatusResponce.ctc : formInput.ctc}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="date"
              type="date"
              name="workingDate"
              defaultValue={Response.currentStatusResponce?.workingDate ? Response.currentStatusResponce.workingDate : formInput.workingDate}
              value={Response.currentStatusResponce?.workingDate ? Response.currentStatusResponce.workingDate : formInput.workingDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              label="Working From"
              onChange={handleInput}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  main: {
    marginRight: '20px',
    marginLeft: '20px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  large: {
    left: '48%',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default CurrentStatusComponent;