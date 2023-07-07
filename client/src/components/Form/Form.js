import React, { useEffect, useState } from 'react'

import { TextField, Button, Typography, Paper, InputAdornment} from "@mui/material"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'
import "./style.css"
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
// Get the current id
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });

  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (currentId === null) {
        dispatch(createPost({ ...postData, creatorName: user?.result?.name }));
        alert('Data submitted successfully It reflect after some time');
        clear();

      } else {
        dispatch(updatePost(currentId, { ...postData, creatorName: user?.result?.name }));
        clear();
      }
    } catch (error) {
      console.log(error)
    }

  }


  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: ''
    })
  }

  if (!user?.result?.name) {
    return (
      <Paper className='paper'>
        <Typography variant='h6' align='center'>
          Please Sign In
        </Typography>
      </Paper>
    )
  }

  return (
    // <h1>Form</h1>
    <Paper className='paper' elevation={6}>
      <form autoComplete='off' noValidate className='form' onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Memories
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          required
          fullWidth
          className='form-field'
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          required
          fullWidth
          multiline
          rows={4}
          className='form-field'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <AddCircleOutlineOutlinedIcon style={{ marginTop: '80px' }} color="success" />
              </InputAdornment>
            ),
          }}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          placeholder='Add comma after tags'
          className='form-field'
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />

        <div className='fileInput'>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button className='buttonSubmit' variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button className='buttonSubmit' variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>

  )

}
export default Form