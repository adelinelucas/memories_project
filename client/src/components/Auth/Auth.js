import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState= {fistName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate(); 
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        console.log('test')
        e.preventDefault();
        console.log(formData)
        if(isSignup){
            dispatch( signup(formData, history))
        }else{
            dispatch( signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    
    const handleShowPassword = () => {
        setShowPassword( (prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup( (prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res.profileObj;  
        // ici on met les ?. pour éviter d'avoir une erreur bloquante, en cas d'erreur cela renvoit undefined mais cela ne bloque pas l'exécution du script
        const token = res.tokenId;
        try {
            dispatch({type:'AUTH', data: {result, token} });
            history('/');
        }catch(err) {
            console.log('toto')
            console.log(err)
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was uncessful. Try again later")
    }

    return (
        <Container component= "main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography varient="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {
                            isSignup && ( 
                                <>
                                    <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                
                                    <Input name="lastName" label="Last name" handleChange={handleChange} autoFocus half />
                                </>
                            )
                        }
                        <Input name="email" label="Email adress" handleChange={handleChange} type='email' autoFocus />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password" } handleShowPassword={handleShowPassword} />
                        { isSignup &&                         
                        <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? ' Sign Up' : 'Sign In' }</Button>
                    {/* <GoogleLogin 
                        clientID="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>} 
                                variant="contained"
                            >
                            Google Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin" 
                    /> */}
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> 
                                {isSignup ? 'Already have an account Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;