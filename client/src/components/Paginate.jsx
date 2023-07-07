import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import "./styles.css"
import { Link } from 'react-router-dom'
import { getPosts } from '../actions/posts'
const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    // console.log(numberOfPages)
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [dispatch, page])
    return (
        <Pagination
            className='ul'
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate