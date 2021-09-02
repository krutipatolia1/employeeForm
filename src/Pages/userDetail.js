import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { bankDetailsSuccess, currentStatusSuccess, educationDetailsSuccess, employeeFormSuccess, experienceDetailsSuccess, personalDetailsSuccess, professionalDetailsSuccess } from '../Store/personalDetails/action';

function getSteps() {
  return ['Personal Details', 'Bank Details', 'Professional Details', 'Current Status', 'Experience Details', 'Educational Details'];
}

const UserDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
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
  const [isSubmit, setIsSubmit] = useState(false)
  const [id, setId] = useState(0)

  const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetailComponent value={personalDetailValue} setValue={setPersonalDetailValue} isRemove={isRemovePersonal} />;
      case 1:
        return <BankDetailComponent value={bankDetailValue} setValue={setBankDetailValue} isRemove={isRemoveBank} />;
      case 2:
        return <ProfessionalDetailComponent value={professionalDetailValue} setValue={setProfessionalDetailValue} isRemove={isRemoveProfessional} />;
      case 3:
        return <CurrentStatusComponent value={currentStatusValue} setValue={setCurrentStatusValue} isRemove={isRemoveuCrrentStatus} />;
      case 4:
        return <ExperienceDetailComponent value={experienceDetailsValue} setValue={setExperienceDetailsValue} isRemove={isRemoveExperience} />;
      case 5:
        return <EducationalDetailComponent value={educationDetailsValue} setValue={setEducationDetailsValue} isRemove={isRemoveEducation} />;
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const handleNext = (activeStep) => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
        // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
    if (activeStep === 0) {
      dispatch(personalDetailsSuccess(personalDetailValue))
    } else if (activeStep === 1) {
      dispatch(bankDetailsSuccess(bankDetailValue))
    } else if (activeStep === 2) {
      dispatch(professionalDetailsSuccess(professionalDetailValue))
    } else if (activeStep === 3) {
      dispatch(currentStatusSuccess(currentStatusValue))
    } else if (activeStep === 4) {
      dispatch(experienceDetailsSuccess(experienceDetailsValue))
    } else if (activeStep === 5) {
      dispatch(educationDetailsSuccess(educationDetailsValue))
    }
  };

  const nextClick = (activeStep) => {
    if (activeStep === 0) {
      return personalDetailValue[0] !== undefined && personalDetailValue[0]?.firstName !== '' && personalDetailValue[0]?.lastName !== '' && personalDetailValue[0]?.dob !== ''
        && personalDetailValue[0]?.phone !== '' && personalDetailValue[0]?.email !== '' ? false : true
    } else if (activeStep === 1) {
      return bankDetailValue[0] !== undefined && bankDetailValue[0]?.acNumber !== '' && bankDetailValue[0]?.ifsc !== '' && bankDetailValue[0]?.pan !== ''
        && bankDetailValue[0]?.adhar !== '' ? false : true
    } else if (activeStep === 2) {
      return professionalDetailValue[0] !== undefined && professionalDetailValue[0]?.years !== ''
        ? false : true
    } else if (activeStep === 3) {
      return currentStatusValue[0] !== undefined && currentStatusValue[0]?.compnay !== '' && currentStatusValue[0]?.designation !== '' && currentStatusValue[0]?.department !== ''
        && currentStatusValue[0]?.ctc !== '' && currentStatusValue[0]?.workingDate !== '' ? false : true
    } else if (activeStep === 4) {
      return experienceDetailsValue[0] !== undefined && experienceDetailsValue[0]?.compnay !== '' && experienceDetailsValue[0]?.designation !== '' && experienceDetailsValue[0]?.department !== ''
        && experienceDetailsValue[0]?.ctc !== '' && experienceDetailsValue[0]?.workingDate !== '' && experienceDetailsValue[0]?.workingTo !== '' ? false : true
    } else if (activeStep === 5) {
      return true
    }
  }

  const handleRemove = (activeStep) => {
    if (activeStep === 0 && personalDetailValue) {
      setPersonalDetailValue({ dob: "", email: "", firstName: "", lastName: "", phone: "", profilePicture: null })
      dispatch(personalDetailsSuccess({ dob: "", email: "", firstName: "", lastName: "", phone: "", profilePicture: null }))
    } else if (activeStep === 1 && bankDetailValue && bankDetailValue[0]) {
      setBankDetailValue({ acNumber: "", ifsc: "", pan: "", adhar: "" })
      dispatch(bankDetailsSuccess({ acNumber: "", ifsc: "", pan: "", adhar: "" }))
    } else if (activeStep === 2 && professionalDetailValue && professionalDetailValue[0]) {
      setProfessionalDetailValue({ years: "", months: "" })
      dispatch(professionalDetailsSuccess({ years: "", months: "" }))
    } else if (activeStep === 3 && currentStatusValue && currentStatusValue[0]) {
      setCurrentStatusValue({ compnay: "", designation: "", department: "", ctc: "", workingDate: "" })
      dispatch(currentStatusSuccess({ compnay: "", designation: "", department: "", ctc: "", workingDate: "" }))
    } else if (activeStep === 4 && experienceDetailsValue && experienceDetailsValue[0]) {
      setExperienceDetailsValue({ compnay: "", designation: "", department: "", ctc: "", workingDate: "", workingTo: "" })
      dispatch(experienceDetailsSuccess({ compnay: "", designation: "", department: "", ctc: "", workingDate: "", workingTo: "" }))
    } else if (activeStep === 5 && educationDetailsValue && educationDetailsValue[0]) {
      setEducationDetailsValue({ course: "", university: "", passedOn: "", grade: "" })
      dispatch(educationDetailsSuccess({ course: "", university: "", passedOn: "", grade: "" }))
    }
  }

  useEffect(() => {
    if (isSubmit) {
      dispatch(employeeFormSuccess({
        id: id,
        profile: personalDetailValue[0].profile, dob: personalDetailValue[0].dob, email: personalDetailValue[0].email, firstName: personalDetailValue[0].firstName, lastName: personalDetailValue[0].lastName, phone: personalDetailValue[0].phone,
        acNumber: bankDetailValue[0].acNumber, ifsc: bankDetailValue[0].ifsc, pan: bankDetailValue[0].pan, adhar: bankDetailValue[0].adhar, years: professionalDetailValue[0].years, months: professionalDetailValue[0].months,
        pastCompnay: experienceDetailsValue[0].compnay, pastDesignation: experienceDetailsValue[0].designation, pastDepartment: experienceDetailsValue[0].department, pastCtc: experienceDetailsValue[0].ctc, pastWorkingDate: experienceDetailsValue[0].workingDate, workingTo: experienceDetailsValue[0].workingTo,
        course: educationDetailsValue[0].course, university: educationDetailsValue[0].university, passedOn: educationDetailsValue[0].passedOn, grade: educationDetailsValue[0].grade,
        compnay: currentStatusValue[0].compnay, designation: currentStatusValue[0].designation, department: currentStatusValue[0].department, ctc: currentStatusValue[0].ctc, workingDate: currentStatusValue[0].workingDate
      }))

      history.push({
        pathname: '/',
        state: { data: isSubmit }
      })
      dispatch(personalDetailsSuccess({ dob: "", email: "", firstName: "", lastName: "", phone: "", profilePicture: null }))
      dispatch(bankDetailsSuccess({ acNumber: "", ifsc: "", pan: "", adhar: "" }))
      dispatch(professionalDetailsSuccess({ years: "", months: "" }))
      dispatch(experienceDetailsSuccess({ compnay: "", designation: "", department: "", ctc: "", workingDate: "", workingTo: "" }))
      dispatch(educationDetailsSuccess({ course: "", university: "", passedOn: "", grade: "" }))
      dispatch(currentStatusSuccess({ compnay: "", designation: "", department: "", ctc: "", workingDate: "" }))
    }
  }, [isSubmit])

  const handleDisableSubmit = () => {
    if (educationDetailsValue[0] !== undefined && educationDetailsValue[0]?.course !== '' && educationDetailsValue[0]?.passedOn !== ''
      && educationDetailsValue[0]?.university !== '' && educationDetailsValue[0]?.grade !== '') {
      return false
    } else {
      return true
    }
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
              <Button onClick={() => {
                handleRemove(activeStep);
                if (activeStep === 0) {
                  setIsRemovePersonal(true)
                } else if (activeStep === 1) {
                  setIsRemoveBank(true)
                } else if (activeStep === 2) {
                  setIsRemoveProfessional(true)
                } else if (activeStep === 3) {
                  setIsRemoveCurrentStatus(true)
                } else if (activeStep === 4) {
                  setIsRemoveExperience(true)
                } else if (activeStep === 5) {
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
                onClick={() => handleNext(activeStep)}
                disabled={
                  nextClick(activeStep)
                }
                className={classes.button}
              >
                Next
              </Button>
              <Button disabled={handleDisableSubmit()
              }
                variant="contained"
                color="primary"
                onClick={async () => {
                  await setId(Response?.employeeFormResponce.length + 1);
                  await setIsSubmit(true);
                }}
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