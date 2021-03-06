import React, { useState, useReducer, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { shallowEqual, useSelector } from 'react-redux';
import { emailValidator, onlyChar } from '../Utils/Validators';
import { useLocation } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const PersonalDetailComponent = ({ isRemove, setValue }) => {
  const classes = useStyles();
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(null)
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);
  const [error, setError] = useState({ firstName: '', lastName: '', email: '' });
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    if (isRemove) {
      setFormInput({ firstName: "", lastName: "", dob: '', email: '', phone: '', profilePicture: null })
    }
  }, [isRemove])

  useEffect(() => {
    if (location?.state?.submit) {
      setFormInput({ firstName: "", lastName: "", dob: '', email: '', phone: '', profilePicture: null })
    }
  }, [location?.state?.submit])

  useEffect(() => {
    if (Response?.personalDetailsResponce && Response?.personalDetailsResponce[0]) {
      setSelectedDate(Response?.personalDetailsResponce && Response?.personalDetailsResponce[0]?.dob)
    }
  }, [Response?.personalDetailsResponce && Response?.personalDetailsResponce[0]])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: Response?.personalDetailsResponce ? Response?.personalDetailsResponce[0]?.firstName : '',
      lastName: Response?.personalDetailsResponce ? Response?.personalDetailsResponce[0]?.lastName : '',
      dob: Response?.personalDetailsResponce ? Response?.personalDetailsResponce[0]?.dob : null,
      email: Response?.personalDetailsResponce ? Response?.personalDetailsResponce[0]?.email : '',
      phone: Response?.personalDetailsResponce ? Response?.personalDetailsResponce[0]?.phone : ''
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();
  };

  let today = new Date().toISOString().slice(0, 10)

  const validationSchema = (name, newValue) => {
    switch (name) {
      case 'firstName':
        error.firstName =
          onlyChar(newValue)
            ? 'First Name must only character!'
            : '';
        break;
      case 'lastName':
        error.lastName =
          onlyChar(newValue)
            ? 'Last Name must only character!'
            : '';
        break;
      case 'phone':
        error.phone =
          newValue.length !== 10
            ? 'PhoneNumber must only 10 digit!!'
            : '';
        break;
      case 'email':
        error.email =
          emailValidator(newValue)
            ? ''
            : 'Email is not valid!';
        break;
      default:
        break;
    }
  }

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = (evt.target.value).trim();
    formInput.dob = selectedDate
    formInput.profile = profilePicture
    setFormInput({ [name]: newValue });
    setValue([formInput]);
    validationSchema(name, newValue)
    setError({ [name]: error })
  };

  return (
    <div>
      <Typography>Personal Details</Typography>
      <Avatar src={Response?.personalDetailsResponce?.profilePicture ? Response?.personalDetailsResponce?.profilePicture : profilePicture} className={classes.large} />
      <Typography>Profile picture</Typography>
      <TextField
        id="profilePicture"
        type="file"
        onChange={(event) => onImageChange(event)}
      />
      <div className={classes.main} >
        <form onSubmit={handleSubmit}>
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            value={formInput.firstName}
            className={classes.textField}
            onChange={handleInput}
            helperText={error?.firstName?.firstName}
            error={error?.firstName?.firstName?.length > 0 && error.firstName?.firstName !== "" ? true : false}
          />
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formInput.lastName}
            className={classes.textField}
            onChange={handleInput}
            helperText={error?.lastName?.lastName}
            error={error?.lastName?.lastName?.length > 0 && error.lastName?.lastName !== "" ? true : false}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date of Birth"
              format="MM/dd/yyyy"
              maxDate={today}
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.textField}
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Phone"
            id="margin-normal"
            name="phone"
            className={classes.textField}
            onChange={handleInput}
            type="number"
            value={formInput.phone}
            helperText={error?.phone?.phone}
            error={error?.phone?.phone?.length > 0 && error.phone?.phone !== "" ? true : false}
          />
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            value={formInput.email}
            className={classes.textField}
            onChange={handleInput}
            helperText={error?.email?.email}
            error={error?.email?.email?.length > 0 && error.email?.email !== "" ? true : false}
          />
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
    marginLeft: '20px',
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

export default PersonalDetailComponent