import React, { useState} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Autocomplete } from '@mui/material'
import { getPostBySearch } from '../../actions/posts'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Chip } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Paginate from '../Paginate'
import "./styles.css"
import useMediaQuery from '@mui/material/useMediaQuery'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    // const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch])

    const searchPost = () => {
        if (Object.keys(tags).length !== 0 || search.length !== 0) {
            if (search.trim() || tags) {
                //dispatch search post
                dispatch(getPostBySearch({ search, tags: tags.join(',') }));
                navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
                setSearch('')
                setTags([])
            } else {
                navigate('/')
            }
        } else {
            navigate('/')
        }

    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }
    // const handleAdd = (tag) => {
    //     setTags([...tags, tag])
    //     console.log(tags)
    // };
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
    const largeScreen = useMediaQuery('(max-width: 480px)')
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className='gridContainer' flexDirection={largeScreen ? "column-reverse" : "colum"} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className='appBarSearch' position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label="Search Diary"
                                fullWidth
                                value={search}
                                onKeyUp={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Autocomplete
                                style={{ margin: "10px 0" }}
                                multiple
                                id="tags-outlined"
                                options={tags}
                                defaultValue={[]}
                                getOptionLabel={(option) => (option.name ? option.name : "")}
                                // forcePopupIcon={false}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} deleteIcon={<CancelIcon onMouseDown={(e) => e.stopPropagation()} onChange={handleDelete} />} />

                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Tags"
                                        placeholder="Tags"
                                        value={tags}
                                        onChange={(e) => setTags([...tags, e.target.value])}
                                    />
                                )}
                            />
                            <Button onClick={searchPost} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className='pagination' elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}

export default Home