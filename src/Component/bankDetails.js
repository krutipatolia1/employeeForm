import React, { useEffect, useReducer } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bankDetailsSuccess } from '../Store/personalDetails/action';

const BankDetailComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  useEffect(() => {
    if (isRemove) {
      setFormInput({ acNumber: "", ifsc: "", pan: '', adhar: '', })
    }
  }, [isRemove])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      acNumber: "",
      ifsc: "",
      pan: '',
      adhar: '',
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
      <Typography>Bank Details</Typography>
      <div className={classes.main} >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="acNumber"
              name="acNumber"
              label="Account Number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].acNumber : formInput.acNumber}
              type="number"
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="ifsc"
              name="ifsc"
              label="IFSC"
              type="number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].ifsc : formInput.ifsc}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="pan"
              type="number"
              name="pan"
              className={classes.textField}
              label="PAN Card Number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].pan : formInput.pan}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="adhar"
              name="adhar"
              label="Adhar Card Number"
              type="number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].adhar : formInput.adhar}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
        </form>
      </div>
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

export default BankDetailComponent;