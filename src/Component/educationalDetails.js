import React, { useEffect, useReducer } from 'react';
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
import { educationDetailsSuccess } from '../Store/personalDetails/action';

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


const EducationalDetailComponent = ({ setValue, isRemove }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  useEffect(() => {
    if (isRemove) {
      setFormInput({ course: "", university: "", passedOn: '', grade: '' })
    }
  }, [isRemove])

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      course: "",
      university: "",
      passedOn: '',
      grade: '',
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
          <Typography style={{ marginRight: '70%' }}>Add New Education</Typography>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}></DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="course"
                label="Course"
                name="course"
                value={Response?.educationDetailsResponce && Response?.educationDetailsResponce[0] ? Response.educationDetailsResponce[0].course : formInput.course}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="university"
                label="University"
                name="university"
                value={Response?.educationDetailsResponce && Response?.educationDetailsResponce[0] ? Response.educationDetailsResponce[0].university : formInput.university}
                className={classes.textField}
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="date"
                type="date"
                name="passedOn"
                value={Response?.educationDetailsResponce && Response?.educationDetailsResponce[0] ? Response.educationDetailsResponce[0].passedOn : formInput.passedOn}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Pssed On"
                onChange={handleInput}
              />
            </div>
            <div>
              <TextField
                id="grade"
                label="Grade"
                name="grade"
                value={Response?.educationDetailsResponce && Response?.educationDetailsResponce[0] ? Response.educationDetailsResponce[0].grade : formInput.grade}
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
  closeButton: {
    color: 'red',
  },
}));

export default EducationalDetailComponent;