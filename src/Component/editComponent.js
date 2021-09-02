import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { userEdit } from '../Store/personalDetails/action';
import { Avatar, Button } from '@material-ui/core';

const UserEdit = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(null);
    const dispatch = useDispatch();
    const userDetails = location?.state?.user;
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        if (userDetails) {
            setSelectedDate(userDetails?.dob)
        }
    }, [userDetails])

    useEffect(() => {
        if (userDetails) {
            setProfilePicture(userDetails?.profile)
        }
    }, [userDetails])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    let today = new Date().toISOString().slice(0, 10)

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            profile: userDetails?.profile,
            firstName: userDetails?.firstName,
            lastName: userDetails?.lastName,
            dob: userDetails?.dob,
            email: userDetails?.email,
            phone: userDetails?.phone,
            acNumber: userDetails?.acNumber,
            adhar: userDetails?.adhar,
            ifsc: userDetails?.ifsc,
            pan: userDetails?.pan,
            compnay: userDetails?.compnay,
            ctc: userDetails?.ctc,
            department: userDetails?.department,
            designation: userDetails?.designation,
            course: userDetails?.course,
            workingDate: userDetails?.workingDate,
            months: userDetails?.months,
            years: userDetails?.years,
            workingTo: userDetails?.workingTo,
            pastCompnay: userDetails?.pastCompnay,
            pastCtc: userDetails?.pastCtc,
            pastDepartment: userDetails?.pastDepartment,
            pastDesignation: userDetails?.pastDesignation,
            pastWorkingDate: userDetails?.pastWorkingDate,
            course: userDetails?.course,
            university: userDetails?.university,
            passedOn: userDetails?.passedOn,
            grade: userDetails?.grade,

        }
    );

    const handleSubmit = evt => {
        formInput.id = location?.state?.user?.id
        dispatch(userEdit(formInput));
        history.push('/')

    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue })
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(URL.createObjectURL(event.target.files[0]));
        }
    }
    return (
        <div>
            <Typography>Edit Users</Typography>
            <div style={{ marginLeft: '48%' }}>
                <Avatar src={profilePicture} className={classes.large} />
            </div>
            <Typography>Profile picture</Typography>
            <TextField
                id="profilePicture"
                type="file"
                onChange={(event) => onImageChange(event)}
            />
            <form onSubmit={handleSubmit}>
                <div style={{ marginLeft: '25%' }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Personal Details</h3>
                            <div>
                                <TextField
                                    id="firstName"
                                    label="FirstName"
                                    name="firstName"
                                    value={formInput.firstName}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="lastName"
                                    label="LastName"
                                    name="lastName"
                                    value={formInput.lastName}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={formInput.email}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div><MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                            </MuiPickersUtilsProvider></div>
                            <div>
                                <TextField
                                    id="phone"
                                    label="PhoneNumber"
                                    name="phone"
                                    value={formInput.phone}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginLeft: '25%', marginTop: 10 }} >
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Bank Details</h3>
                            <div>
                                <TextField
                                    id="acNumber"
                                    name="acNumber"
                                    label="Account Number"
                                    value={formInput.acNumber}
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
                                    value={formInput.ifsc}
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
                                    value={formInput.pan}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="adhar"
                                    name="adhar"
                                    label="Adhar Card Number"
                                    type="number"
                                    value={formInput.adhar}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginLeft: '25%', marginTop: 10 }} >
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Current Status</h3>
                            <div>
                                <TextField
                                    id="compnay"
                                    label="Compnay"
                                    name="compnay"
                                    value={formInput.compnay}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="designation"
                                    label="Designation"
                                    name="designation"
                                    value={formInput.designation}
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
                                    value={formInput.ctc}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="date"
                                    type="date"
                                    name="workingDate"
                                    value={formInput.workingDate}
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
                                    value={formInput.department}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginLeft: '25%', marginTop: 10 }} >
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Proffesional Details</h3>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="years"
                                        label="Years"
                                        name="years"
                                        type="number"
                                        value={formInput.years}
                                        className={classes.textField}
                                        onChange={handleInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div style={{ marginLeft: 10 }}>
                                        <TextField
                                            id="months"
                                            label="Months"
                                            name="months"
                                            type="number"
                                            value={formInput.months}
                                            className={classes.textField}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginLeft: '25%', marginTop: 10 }} >
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Experience Details</h3>
                            <div>
                                <TextField
                                    id="pastCompnay"
                                    label="Past Compnay"
                                    name="pastCompany"
                                    value={formInput.pastCompnay}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="pastDesignation"
                                    label="past Designation"
                                    name="pastDesignation"
                                    value={formInput.pastDesignation}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="pastDepartment"
                                    label="Past Department"
                                    name="pastDepartment"
                                    value={formInput.pastDepartment}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="pastWorkingDate"
                                    type="Past WorkingDate"
                                    name="pastWorkingDate"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="From"
                                    value={formInput.pastWorkingDate}
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
                                    value={formInput.workingTo}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="pastCtc"
                                    label="Past CTC"
                                    name="pastCtc"
                                    type="number"
                                    value={formInput.pastCtc}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginLeft: '25%', marginTop: 10 }} >
                    <Card className={classes.card}>
                        <CardContent>
                            <h3>Educational Details</h3>
                            <div>
                                <TextField
                                    id="course"
                                    label="Course"
                                    name="course"
                                    value={formInput.course}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="university"
                                    label="University"
                                    name="university"
                                    value={formInput.university}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="date"
                                    type="date"
                                    name="passedOn"
                                    value={formInput.passedOn}
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
                                    value={formInput.grade}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button variant="contained" color="primary" type='submit'>Click to submit</Button>
                </div>
            </form>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    card: {
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
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
        marginLeft: "20%",
        marginRight: theme.spacing.unit,
        width: '50%',
    },
}));


export default UserEdit;