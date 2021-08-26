import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalDetailComponent from '../Component/personalDetails';
import { useHistory } from "react-router-dom";
import BankDetailComponent from '../Component/bankDetails';
import ProfessionalDetailComponent from '../Component/professionalDetails';
import CurrentStatusComponent from '../Component/currentStatus';
import ExperienceDetailComponent from '../Component/experienceDetails';
import EducationalDetailComponent from '../Component/educationalDetails';
import { shallowEqual, useDispatch, useSelector  } from 'react-redux';
import { bankDetailsSuccess, currentStatusSuccess, educationDetailsSuccess, employeeFormSuccess, experienceDetailsSuccess, personalDetailsSuccess, professionalDetailsSuccess } from '../Store/personalDetails/action';

function getSteps() {
  return ['Personal Details', 'Bank Details', 'Professional Details', 'Current Status', 'Experience Details', 'Educational Details'];
}





const UserDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [personalDetailValue, setPersonalDetailValue] = useState([]);
  const [bankDetailValue, setBankDetailValue] = useState([]);
  const [professionalDetailValue, setProfessionalDetailValue] = useState([]);
  const [currentStatusValue, setCurrentStatusValue] = useState([]);
  const [experienceDetailsValue, setExperienceDetailsValue] = useState([]);
  const [educationDetailsValue, setEducationDetailsValue] = useState([]);
  const [isRemovePersonal, setIsRemovePersonal] = useState(false);
  const [isRemoveBank, setIsRemoveBank] = useState(false);
  const [isRemoveProfessional, setIsRemoveProfessional] = useState(false);
  const [isRemoveuCrrentStatus, setIsRemoveCurrentStatus] = useState(false);
  const [isRemoveExperience, setIsRemoveExperience] = useState(false);
  const [isRemoveEducation, setIsRemoveEducation] = useState(false);
  

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetailComponent value={personalDetailValue} setValue={setPersonalDetailValue} isRemove={isRemovePersonal} />;
      case 1:
        return <BankDetailComponent value={bankDetailValue} setValue={setBankDetailValue} isRemove={isRemoveBank}/>;
      case 2:
        return <ProfessionalDetailComponent value={professionalDetailValue} setValue={setProfessionalDetailValue} isRemove={isRemoveProfessional}/>;
      case 3:
        return <CurrentStatusComponent value={currentStatusValue} setValue={setCurrentStatusValue} isRemove={isRemoveuCrrentStatus}/>;
      case 4:
        return <ExperienceDetailComponent value={experienceDetailsValue} setValue={setExperienceDetailsValue} isRemove={isRemoveExperience}/>;
      case 5:
        return <EducationalDetailComponent value={educationDetailsValue} setValue={setEducationDetailsValue} isRemove={isRemoveEducation}/>;
      default:
        return 'Unknown step';
    }
  }
  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
        // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  const nextClick = (activeStep) => {
    if (activeStep === 0) {
     return personalDetailValue[0] !== undefined && personalDetailValue[0]?.firstName !== '' && personalDetailValue[0]?.lastName !== '' && personalDetailValue[0]?.dob !== ''
     && personalDetailValue[0]?.phone !== '' && personalDetailValue[0]?.email !== ''  ? false : true
    } else if(activeStep === 1){
      return bankDetailValue[0] !== undefined && bankDetailValue[0]?.acNumber !== '' && bankDetailValue[0]?.ifsc !== '' && bankDetailValue[0]?.pan !== ''
      && bankDetailValue[0]?.adhar !== '' ? false : true
    } else if(activeStep === 2){
      return professionalDetailValue[0] !== undefined  && professionalDetailValue[0]?.years !== '' && bankDetailValue[0]?.months !== ''
      ? false : true
    } else if(activeStep === 3){
      return currentStatusValue[0] !== undefined && currentStatusValue[0]?.compnay !== '' && currentStatusValue[0]?.designation !== '' && currentStatusValue[0]?.department !== ''
      && currentStatusValue[0]?.ctc !== '' && currentStatusValue[0]?.workingDate !== ''? false : true
    } else if(activeStep === 4){
      return experienceDetailsValue[0] !== undefined && experienceDetailsValue[0]?.compnay !== '' && experienceDetailsValue[0]?.designation !== '' && experienceDetailsValue[0]?.department !== ''
      && experienceDetailsValue[0]?.ctc !== '' && experienceDetailsValue[0]?.workingDate !== '' && experienceDetailsValue[0]?.workingTo !== ''? false : true
    } else if(activeStep === 5){
      return true
    } 
  }

  const handleRemove = (activeStep) =>{
    if (activeStep === 0 && personalDetailValue && personalDetailValue[0] ) {
       setPersonalDetailValue({dob: "",email: "",firstName: "",lastName: "",phone: ""})  
       dispatch(personalDetailsSuccess({dob: "",email: "",firstName: "",lastName: "",phone: ""}))
     } else if(activeStep === 1 && bankDetailValue && bankDetailValue[0]){
      setBankDetailValue({acNumber: "",ifsc: "",pan: "",adhar: ""})  
      dispatch(bankDetailsSuccess({acNumber: "",ifsc: "",pan: "",adhar: ""}))
     } else if(activeStep === 2 && professionalDetailValue && professionalDetailValue[0]){
      setProfessionalDetailValue({resume: "",years: "",months: ""})  
      dispatch(professionalDetailsSuccess({resume: "",years: "",months: ""}))
     }else if(activeStep === 3 && currentStatusValue && currentStatusValue[0]){
      setCurrentStatusValue({compnay: "",designation: "",department: "",ctc: "",workingDate:""})  
      dispatch(currentStatusSuccess({compnay: "",designation: "",department: "",ctc: "",workingDate:""}))
     }else if(activeStep === 4 && experienceDetailsValue && experienceDetailsValue[0]){
      setExperienceDetailsValue({compnay: "",designation: "",department: "",ctc: "",workingDate:"",workingTo: ""})  
      dispatch(experienceDetailsSuccess({compnay: "",designation: "",department: "",ctc: "",workingDate:"",workingTo: ""}))
     }else if(activeStep === 5 && educationDetailsValue && educationDetailsValue[0]){
      setEducationDetailsValue({course: "",university: "",passedOn: "",grade: ""})  
      dispatch(educationDetailsSuccess({course: "",university: "",passedOn: "",grade: ""}))
     }
  }

  const hadndleSubit = () =>{
    dispatch(employeeFormSuccess([{'PersonalDetails': personalDetailValue ,'BankDetails':bankDetailValue, 'ProfessionalDetails':professionalDetailValue,
                                  'CurrentStatus':currentStatusValue ,'ExperienceDetails':experienceDetailsValue, 'Educational Details':educationDetailsValue}]))
  }
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            <Button  onClick={() => {
              handleRemove(activeStep);
              if(activeStep === 0){
                setIsRemovePersonal(true)
              }else if(activeStep === 1){
                setIsRemoveBank(true)
              }else if(activeStep === 2){
                setIsRemoveProfessional(true)
              }else if(activeStep === 3){
                setIsRemoveCurrentStatus(true)
              }else if(activeStep === 4){
                setIsRemoveExperience(true)
              }else if(activeStep === 5){
                setIsRemoveEducation(true)
              }
            }} className={classes.button}
                variant="contained" color="secondary">
                Remove
              </Button>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}
                variant="outlined" color="primary">
                Previous
              </Button>
              <Button
                variant="outlined" color="secondary"
                onClick={() => { history.push("/") }}
                className={classes.button}
              >
                Exit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={
                  nextClick(activeStep)
                }
                className={classes.button}
              >
                Next
              </Button>
              <Button disabled={activeStep !== 5}
                variant="contained"
                color="primary"
                onClick={hadndleSubit}
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
export default UserDetail