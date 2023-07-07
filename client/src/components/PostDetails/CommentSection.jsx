import React, { useRef, useState } from 'react'
import { Typography, TextField, Button} from '@mui/material'
import './styles.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const commentsRef = useRef()
    const handleClick = async() => {
        const finalComment = `${user.result.name}: ${comment}`;

       const newComments = await dispatch(commentPost(finalComment, post._id));
       setComments(newComments)
       commentsRef.current.scrollIntoView({behaviour: 'smooth'})
    }
    const theme = createTheme({
        palette: {
            primary: {
                main: purple[500],
            },
            secondary: {
                main: '#f44336',
            },
        },
    });

    return (

        <div>
            <div className='commentsOuterContainer'>

                <div className='commentsInnerContainer'>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments?.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(': ')[0]}</strong>:
                            {comment.split(': ')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (

                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>Write your Comments</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant='outlined'
                            label="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <ThemeProvider theme={theme}>
                            <Button color="secondary" style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                                Comment
                            </Button>
                        </ThemeProvider>
                    </div>

                )}

            </div>
        </div>

    )
}

export default CommentSection