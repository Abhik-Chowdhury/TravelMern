import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Icon } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './styles.css'
import Input from './Input';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { pink } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { AUTH } from '../../constants/actionType';
import { signin, signup } from '../../actions/auth';
const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    // const state = null;
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    // const [checkerror,setChckError] = useState(isError)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {

        e.preventDefault()
        // check first that any field is not empty
        
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            try {

                dispatch(signin(formData, navigate))
            } catch (error) {
                console.log(error)
            }

        }

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const useResult = jwt_decode(res?.credential);
        const result = useResult
        const token = useResult?.jti;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In was Unsuccessful, Try Again Later")
    }
    return (
        <Container component="main" maxWidth="xs" >
            <Paper className="paper" elevation={3}>
                <Avatar className="avatar" sx={{ bgcolor: pink[500] }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstname' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastname' label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>


                    <Button type='submit' sx={{ margin: '20px 0 10px' }} fullWidth variant='contained' color='primary' className="submit" onClick={handleSubmit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleOAuthProvider clientId='485544633141-lll8h9sk032rs4qkodg7af9rbul79ou1.apps.googleusercontent.com'>

                        <GoogleLogin
                            render={(renderProps) => (
                                <Button className="googleButton" fullWidth color='primary' sx={{ marginBottom: '16px' }} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                    Google Sign In
                                </Button>
                            )}

                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            state_cookie_domain='single_host_origin'
                        />
                    </GoogleOAuthProvider>
                    {/* this for switch the mode */}
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignup ? 'Already have an account? Sign In' : "Don't have an account ? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>


    )
}

export default Auth