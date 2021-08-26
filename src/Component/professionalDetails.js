import React, { useState, useReducer, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { professionalDetailsSuccess } from '../Store/personalDetails/action';

const ProfessionalDetailComponent = ({ setValue, isRemove }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [skill, setSkill] = useState('');
    const [resume, setResume] = useState(null);
    const Response = useSelector((state) => { return state.personalDetail }, shallowEqual);
    console.log("Res", Response)
    useEffect(() => {
        if (isRemove) {
            setFormInput({ resume: "", years: "", months: '', skill: '' })
        }
    }, [isRemove])

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            years: "",
            months: '',
            skill: skill,
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
        formInput.skill = skill
        dispatch(professionalDetailsSuccess(formInput))
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setResume(URL.createObjectURL(event.target.files[0]));
        }
    }

    const top100Films = [
        { title: 'Java' },
        { title: 'React' },
        { title: 'Angular' },
        { title: 'dotNet' },
        { title: 'Python' },
        { title: "AI" },
        { title: 'ML' },
        { title: 'Android' },
        { title: 'Php' },
    ];

    return (
        <div>
            <Typography>Professional Details</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            accept="image/*"
                            id="resume"
                            label="Resume"
                            name="resume"
                            // defaultValue ={Response.professionalDetailsResponce?.resume ? Response.professionalDetailsResponce?.resume: resume}
                            // value={Response.professionalDetailsResponce?.resume ? Response.professionalDetailsResponce?.resume: resume}
                            type="file"
                            onChange={(event) => onImageChange(event)}
                        // onChange={handleInput}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button onClick={() => window.open(resume, "_blank")}
                            variant="outlined" color="primary" disabled={resume === null ? true : false}>
                            Preview
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.main} >
                    <div style={{ marginRight: '90%' }}>
                        <Typography >Total Experience</Typography>
                    </div>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="years"
                                label="Years"
                                name="years"
                                type="number"
                                defaultValue={Response.professionalDetailsResponce?.years ? Response.professionalDetailsResponce.years : formInput.years}
                                value={Response.professionalDetailsResponce?.years ? Response.professionalDetailsResponce.years : formInput.years}
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
                                    defaultValue={Response.professionalDetailsResponce?.months ? Response.professionalDetailsResponce.months : formInput.months}
                                    value={Response.professionalDetailsResponce?.months ? Response.professionalDetailsResponce.months : formInput.months}
                                    className={classes.textField}
                                    onChange={handleInput}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            defaultValue={[top100Films[1]]}
                            onChange={(event, value) => setSkill(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Skills"
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
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
    title: {

    }
}));

export default ProfessionalDetailComponent;