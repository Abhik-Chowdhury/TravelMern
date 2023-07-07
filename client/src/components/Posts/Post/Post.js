import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LaunchIcon from '@mui/icons-material/Launch';
import moment from 'moment'
import "./styles.css"
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom';
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
  const openPost = () =>{
    navigate(`/posts/${post?._id}`)
  }
  const [likeCount, setLikeCount] = useState(post?.likeCount)
  const userId = user?.result?.sub || user?.result?._id
  const hasLikePost = post.likeCount.find((like) => like === userId)
  const handleLike = async ()=>{
     dispatch(likePost(post._id))
     if(hasLikePost){
      setLikeCount(post.likeCount.filter((id) => id !== (userId)))
     }else{
      setLikeCount([...post.likeCount, userId])
     }
  }
  const Likes = () => {
    if (likeCount.length > 0) {
      return likeCount.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likeCount.length > 2 ? `You and ${likeCount.length - 1} others` : `${likeCount.length} like${likeCount.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likeCount.length} {likeCount.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };
  return (
    <Card className='card' style={{borderRadius: '15px'}} raised elevation={6}>
      {/* <ButtonBase className='cardAction' onClick={openPost}> */}
      <CardMedia className='media'   component='div' image={post.selectedFile}  title={post.title} />
      <div className='overlay'>
        <Typography variant='h6'>{post.creatorName}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      
      {/* We are checking that the post creator Id and the current login user both are same or not */}
      {/* then only we alow the edit to be visible or not */}
      {
        (user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div className='overlay2'>
            <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
              <EditTwoToneIcon size='20px' fontSize='medium' />
            </Button>
          </div>
        )
      }

      <div className='details'>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className='title' variant='h5' gutterBottom component="h2">{post.title}</Typography>
      <CardContent>
        <Typography className='title' variant='body2' color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      {/* </ButtonBase> */}
      <CardActions className='CardActionss'>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>

        {/* We are checking that the post creator Id and the current login user both are same or not */}
        {/* then only we alow the delete to be visible or not */}
        {
          (user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon sx={{color: 'red'}} fontSize='small' />
              Delete
            </Button>
          )
        }

        <Button size='small' color='primary' onClick={openPost}>
          <LaunchIcon/>
        </Button>
      </CardActions>
    </Card>
  )

}

export default Post