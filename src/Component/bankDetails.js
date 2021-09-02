import React, { useEffect, useReducer, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bankDetailsSuccess } from '../Store/personalDetails/action';
import { accountNoValidator, adharValidator, ifscValidator, panValidator } from '../Utils/Validators';

const BankDetailComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);
  const [error, setError] = useState({ acNumber: '', ifsc: '', pan: '', adhar: '' });

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

  const validationSchema = (name, newValue) => {
    switch (name) {
      case 'acNumber':
        error.acNumber =
          newValue.length !== 12
            ? 'Please enter 12 digit valid account number.(000123456789)!'
            : '';
        break;
      // case 'ifsc':
      //   error.ifsc =
      //     ifscValidator((newValue).trim())
      //       ? 'Last Name must only character!'
      //       : '';
      //   break;
      // case 'pan':
      //   error.pan =
      //     panValidator(newValue.toUpperCase())
      //       ? 'PhoneNumber must only 10 digit!!'
      //       : '';
      //   break;
      case 'adhar':
        error.adhar =
          newValue.length !== 12
            ? 'Please enter 12 digit valid adharcard number.(000123456789)!'
            : '';
        break;
      default:
        break;
    }
  }

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    setValue([formInput]);
    validationSchema(name, newValue)
    setError({ [name]: error })

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
              helperText={error?.acNumber?.acNumber}
              error={error?.acNumber?.acNumber?.length > 0 && error.acNumber?.acNumber !== "" ? true : false}
            />
          </div>
          <div>
            <TextField
              id="ifsc"
              name="ifsc"
              label="IFSC"
              // type="number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].ifsc : formInput.ifsc}
              className={classes.textField}
              onChange={handleInput}
            // helperText={error?.ifsc?.ifsc}
            // error={error?.ifsc?.ifsc?.length > 0 && error.ifsc?.ifsc !== "" ? true : false}
            />
          </div>
          <div>
            <TextField
              id="pan"
              // type="number"
              name="pan"
              className={classes.textField}
              label="PAN Card Number"
              value={Response?.bankDetailsResponce && Response?.bankDetailsResponce[0] ? Response.bankDetailsResponce[0].pan : formInput.pan}
              onChange={handleInput}
            // helperText={error?.pan?.pan}
            // error={error?.pan?.pan?.length > 0 && error.pan?.pan !== "" ? true : false}
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
              helperText={error?.adhar?.adhar}
              error={error?.adhar?.adhar?.length > 0 && error.adhar?.adhar !== "" ? true : false}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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