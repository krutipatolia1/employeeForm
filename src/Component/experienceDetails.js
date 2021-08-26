import React, { useState, useReducer, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { experienceDetailsSuccess } from '../Store/personalDetails/action';

const DialogTitle = withStyles()((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle >
      {onClose ? (
        <IconButton aria-label="close" color="secondary" onClick={onClose} style={{ marginLeft: '80%' }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
}))(MuiDialogContent);


const ExperienceDetailComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  useEffect(() => {
    if (isRemove) {
      setFormInput({ compnay: "", designation: "", department: '', ctc: '', workingDate: '', workingTo: '' })
    }
  }, [isRemove])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      compnay: "",
      designation: "",
      department: '',
      ctc: '',
      workingDate: '',
      workingTo: ''
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
    dispatch(experienceDetailsSuccess(formInput))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography>Experience Details</Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <AddBoxIcon color="primary" onClick={handleClickOpen} style={{ marginLeft: '97%' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography style={{ marginRight: '70%' }}>Add New Experience</Typography>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}></DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="compnay"
                label="Compnay"
                name="compnay"
                defaultValue={Response.experienceDetailsResponce?.compnay ? Response.experienceDetailsResponce.compnay : formInput.compnay}
                value={Response.experienceDetailsResponce?.compnay ? Response.experienceDetailsResponce.compnay : formInput.compnay}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="designation"
                label="Designation"
                name="designation"
                defaultValue={Response.experienceDetailsResponce?.designation ? Response.experienceDetailsResponce.designation : formInput.designation}
                value={Response.experienceDetailsResponce?.designation ? Response.experienceDetailsResponce.designation : formInput.designation}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="department"
                label="Department"
                name="department"
                defaultValue={Response.experienceDetailsResponce?.department ? Response.experienceDetailsResponce.department : formInput.department}
                value={Response.experienceDetailsResponce?.department ? Response.experienceDetailsResponce.department : formInput.department}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="workingDate"
                type="date"
                name="workingDate"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label="From"
                defaultValue={Response.experienceDetailsResponce?.workingDate ? Response.experienceDetailsResponce.workingDate : formInput.workingDate}
                value={Response.experienceDetailsResponce?.workingDate ? Response.experienceDetailsResponce.workingDate : formInput.workingDate}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="workingTo"
                type="date"
                name="workingTo"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label="To"
                defaultValue={Response.experienceDetailsResponce?.workingTo ? Response.experienceDetailsResponce.workingTo : formInput.workingTo}
                value={Response.experienceDetailsResponce?.workingTo ? Response.experienceDetailsResponce.workingTo : formInput.workingTo}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="ctc"
                label="CTC"
                name="ctc"
                type="number"
                defaultValue={Response.experienceDetailsResponce?.ctc ? Response.experienceDetailsResponce.ctc : formInput.ctc}
                value={Response.experienceDetailsResponce?.ctc ? Response.experienceDetailsResponce.ctc : formInput.ctc}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>

          </form>
        </DialogContent>
      </Dialog>
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
}));

export default ExperienceDetailComponent;