import React, { useState,useReducer, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { shallowEqual, useDispatch, useSelector  } from 'react-redux';
import { personalDetailsSuccess } from '../Store/personalDetails/action';
import { toast } from 'react-toastify';
import { emailValidator, isNull, onlyChar, phoneValidator } from '../Utils/Validators';
import { validationMessage } from '../Utils/ValidationMessage';

const PersonalDetailComponent = ({ isRemove, onChange ,setValue}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null)
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
   }
   
  useEffect(()=>{
  if(isRemove){
    setFormInput({firstName: "", lastName: "", dob: '', email:'', phone:''})
  }
  },[isRemove])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      dob: '',
      email:'',
      phone:''
    }
  );

  const handleSubmit = evt => {
    evt.preventDefault();

  };
  const error = onlyChar(formInput.firstName)
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = (evt.target.value).trim();
    //  if (evt.target.name=== 'firstName' && onlyChar( newValue)) {
    //   toast.error(validationMessage.Name)
    //   return;
    // } else if (evt.target.name=== 'lastName' && onlyChar( newValue)) {
    //   toast.error(validationMessage.LName)
    //   return;
    // } else if (evt.target.name=== 'phone' && phoneValidator( newValue)) {
    //   toast.error(validationMessage.validPhn)
    //   return;
    // } 
    setFormInput({ [name]: newValue });
    setValue([formInput]);
    formInput.profilePicture = profilePicture
    dispatch(personalDetailsSuccess(formInput))
  };

  return (
    <div>
      <Typography>Personal Details</Typography>
      <Avatar src={Response?.personalDetailsResponce?.profilePicture ?Response?.personalDetailsResponce?.profilePicture: profilePicture} className={classes.large} />
      <Typography>Profile picture</Typography>
      <TextField
        id="profilePicture"
        type="file"
        onChange={(event) =>onImageChange(event)}
        />
      <div className={classes.main} >
        <form onSubmit={handleSubmit}>
        <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            defaultValue={Response.personalDetailsResponce?.firstName ? Response.personalDetailsResponce.firstName: formInput.firstName}
            value={Response.personalDetailsResponce?.firstName ? Response.personalDetailsResponce.firstName: formInput.firstName}
            className={classes.textField}
            onChange={handleInput}
            helperText={onlyChar(formInput.firstName) ? "only chartectrr" : "firstName"}
            error={onlyChar(formInput.firstName) ? true : false}
            
          />
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            defaultValue={Response.personalDetailsResponce?.lastName ? Response.personalDetailsResponce.lastName : formInput.lastName}
            value={Response.personalDetailsResponce?.lastName ? Response.personalDetailsResponce.lastName : formInput.lastName}
            className={classes.textField}
            onChange={handleInput}
            helperText={onlyChar(formInput.lastName) ? "only character" : "lastName"}
            error={onlyChar(formInput.lastName) ? true : false}
          />
          <TextField
            id="date"
            type="date"
            name="dob"
            defaultValue={Response.personalDetailsResponce?.dob ? Response.personalDetailsResponce.dob : formInput.dob}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            label="Date of Birth"
            value={Response.personalDetailsResponce?.dob ? Response.personalDetailsResponce.dob : formInput.dob}
            onChange={handleInput}
          />
          <TextField
            label="Phone"
            id="margin-normal"
            name="phone"
            defaultValue={Response.personalDetailsResponce?.phone ? Response.personalDetailsResponce?.phone : formInput.phone}
            className={classes.textField}
            onChange={handleInput}
            type="number"
            value={Response.personalDetailsResponce?.phone ? Response.personalDetailsResponce?.phone :formInput.phone}
            helperText={phoneValidator(formInput.phone) ? "only 10 digit" : "phonenumber"}
            error={phoneValidator(formInput.phone) ? true : false}
          />
          <TextField
            label="Email"
            id="margin-normal"
            name="email"
            defaultValue={Response.personalDetailsResponce?.email ? Response.personalDetailsResponce.email : formInput.email}
            value={Response.personalDetailsResponce?.email ? Response.personalDetailsResponce.email : formInput.email}
            className={classes.textField}
            onChange={handleInput}
            helperText={"ex.: @abc@gmail.com"}
          />
      </form>
      </div>
      {/* <div>
      <Button  onClick={() =>{setFormInput({dob: "",email: "",firstName: "",lastName: "",phone: ""});
      dispatch(personalDetailsSuccess({dob: "",email: "",firstName: "",lastName: "",phone: ""}))}} className={classes.button}
                variant="outlined" color="secondary">
                Remove
              </Button>
      </div> */}
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