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
    dispatch(bankDetailsSuccess(formInput))

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
              defaultValue={Response.bankDetailsResponce?.acNumber ? Response.bankDetailsResponce.acNumber : formInput.acNumber}
              value={Response.bankDetailsResponce?.acNumber ? Response.bankDetailsResponce.acNumber : formInput.acNumber}
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
              defaultValue={Response.bankDetailsResponce?.ifsc ? Response.bankDetailsResponce.ifsc : formInput.ifsc}
              value={Response.bankDetailsResponce?.ifsc ? Response.bankDetailsResponce.ifsc : formInput.ifsc}
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
              defaultValue={Response.bankDetailsResponce?.pan ? Response.bankDetailsResponce.pan : formInput.pan}
              value={Response.bankDetailsResponce?.pan ? Response.bankDetailsResponce.pan : formInput.pan}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              id="adhar"
              name="adhar"
              label="Adhar Card Number"
              type="number"
              defaultValue={Response.bankDetailsResponce?.adhar ? Response.bankDetailsResponce.adhar : formInput.adhar}
              value={Response.bankDetailsResponce?.adhar ? Response.bankDetailsResponce.adhar : formInput.adhar}
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