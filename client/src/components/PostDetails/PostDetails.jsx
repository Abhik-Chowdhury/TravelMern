import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, getPostBySearch } from '../../actions/posts'

import CommentSection from './CommentSection'
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tagRec = post?.tags.join(',');
  const search = 'none';
  useEffect(() => {
    dispatch(getPost(id))
  }, [id,dispatch])

  
  useEffect(() => {
    if (post) {
      // dispatch(getPostBySearch({ search, tags: tagRec}));
      dispatch(getPostBySearch({search,tags: tagRec}))
    }
  }, [dispatch])

  if (!posts) return null;

  if (isLoading) {
    return <Paper className='loadingPaper' elevation={6}>
      <CircularProgress />
    </Paper>
  }

  const openPost = (_id) => navigate(`/posts/${_id}`)

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className="card">
        <div className="imageSection">
          <CardMedia className='media' style={{maxHeight: '100px'}} component='div' image={post?.selectedFile} title={post?.title} />
        </div>
        <div className="section">
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
          <Typography variant="h6">Created by: {post?.creatorName}</Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
          <Divider style={{ margin: '20px 0' }} />
          {/* <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography> */}
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>

      </div>
      <div>

      </div>

      {/* Recommeded Post */}

      {
        recommendedPosts.length && (
          <div className='section'>
            <Typography gutterBottom variant='h5'>You might also like</Typography>
            <Divider />
            <div className='recommendedPosts'>
              {recommendedPosts.map(({title, message, selectedFile, likeCount,_id, creatorName}) => (
                <div style={{margin: '20px',cursor:'pointer'}} onClick={()=> openPost(_id)} key={_id}>
                  <Typography gutterBottom variant='h6'>{title}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{creatorName}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                  <Typography gutterBottom variant='subtitle1'>Likes:{likeCount.length}</Typography>
                  <CardMedia className='media' image={selectedFile || 'https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg'}/>
                </div>
              ))}
            </div>

          </div>
        )
      }
    </Paper>
  )
}

export default PostDetails