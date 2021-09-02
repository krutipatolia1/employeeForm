import React, { useEffect, useReducer } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { currentStatusSuccess } from '../Store/personalDetails/action';

const CurrentStatusComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
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
              value={Response?.currentStatusResponce && Response?.currentStatusResponce[0] ? Response.currentStatusResponce[0].compnay : formInput.compnay}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="designation"
              label="Designation"
              name="designation"
              value={Response?.currentStatusResponce && Response?.currentStatusResponce[0] ? Response.currentStatusResponce[0].designation : formInput.designation}
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
              value={Response?.currentStatusResponce && Response?.currentStatusResponce[0] ? Response.currentStatusResponce[0].ctc : formInput.ctc}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="date"
              type="date"
              name="workingDate"
              value={Response?.currentStatusResponce && Response?.currentStatusResponce[0] ? Response.currentStatusResponce[0].workingDate : formInput.workingDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              label="Working From"
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="department"
              label="Department"
              name="department"
              value={Response?.currentStatusResponce && Response?.currentStatusResponce[0] ? Response.currentStatusResponce[0].department : formInput.department}
              className={classes.textField}
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