import React from 'react'
import Post from './Post/Post'

import {Grid,CircularProgress} from "@mui/material"
import { useSelector } from 'react-redux'
import "./styles.css"

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    progress: {
      main: '#fff'
    },
  },
});
export const Posts = ({setCurrentId}) => {
  const {posts, isLoading} = useSelector((state)=> state.posts)
  if(!posts && !isLoading) return 'No Posts'
  return (
     isLoading ?  <ThemeProvider theme={theme}><CircularProgress color='progress'/></ThemeProvider> :(
      <Grid className='mainContainer' container alignItems="stretch" spacing={3}>
        {posts.map((post)=>(
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
     )
  )
}

export default Posts