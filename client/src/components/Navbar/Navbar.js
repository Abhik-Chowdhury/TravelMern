import React, {useEffect, useState} from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@mui/material'
import {Link, useLocation, useNavigate} from "react-router-dom"
import './styles.css'
import travel from "../../image/travel+1.png"
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const logout = ()=>{
    dispatch({type: 'LOGOUT'});
    navigate('/')
    setUser(null)
  }
  useEffect(()=>{
      // const token = user?.token;

      // console.log(jwtDecode(token))
    // JWT check
    try {
      
      if(user?.token){
        const decodedToken = jwtDecode(user?.token);
        // check the token is valid or not
        if(decodedToken.exp * 1000 < new Date().getTime() ) logout()
      }else{
        const googleToken = user?.exp;
        if(googleToken * 1000 < new Date().getTime() ) logout()
      }
    } catch (error) {
      const googleToken = user?.exp;
      if(googleToken * 1000 < new Date().getTime() ) logout()
    }
    
      
    setUser(JSON.parse(localStorage.getItem('profile')));
    
  },[location])

  return (
    <AppBar className="appBar" position='static' color='inherit'>
        <div className='brandContainer'>
         <Typography variant='h3' align='center'><Link to="/"><span className='heading'>TravelDiary+</span></Link></Typography>
         <img className="image" src={travel} alt='TravelDiary+' height="100"/>
        </div>
        <Toolbar className={user ? 'toolbar' : 'toolbarS'}>
            {
              user ? (
                <div className='profile'>
                  <Avatar className='purple' alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                  <Typography variant='h6'><span className='userName'>{user.result.name}</span></Typography>
                  <Button variant='contained' style={{borderRadius: '15px', fontSize:'12px', minWidth: '100px', minHeight: '35px'}} className='logout' color='secondary' onClick={logout}> Logout </Button>
                </div>
              ):(
                
                <Button variant='contained' component={Link} to="/auth"  color='primary'>Sign In</Button>
              )
            }
        </Toolbar>
    </AppBar>
  ) 
}

export default Navbar