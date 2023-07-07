import React from 'react'
import {Container} from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import PostDetails from './components/PostDetails/PostDetails'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
// import "./styles.css"
const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
    <Container maxWidth='xl'>
      <Navbar/>
      <Routes>
        <Route path='/' exact Component={()=> <Navigate to="/posts"/>} />
        <Route path='/posts' exact Component={Home} />
        <Route path='/posts/search' exact Component={Home} />
        <Route path='/posts/:id' Component={PostDetails} />
        <Route path='/auth' exact Component={Auth} />
      </Routes>
    </Container>
    </BrowserRouter>
    
  )
}

export default App