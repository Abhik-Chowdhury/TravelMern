import * as api from "../api"

import { FETCH_ALL, COMMENT, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionType";
// Action creaters


// get the specific post base on id 
export const getPost = (id) => async(dispatch)=>{
    
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id);
        dispatch({type:FETCH_POST, payload: data});
        dispatch({type:END_LOADING})
    } catch (error) {
     console.log(error);   
    }
    // const action = {type:'FETCH_ALL',payload:[]}
}

// the fetch the data
export const getPosts = (page) => async(dispatch)=>{
    
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        dispatch({type:FETCH_ALL, payload: data});
        dispatch({type:END_LOADING})
    } catch (error) {
     console.log(error);   
    }
    // const action = {type:'FETCH_ALL',payload:[]}
}

// Getting post by search
export const getPostBySearch = (searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type: START_LOADING})
        const {data:{data}} = await api.fetchPostsBySearch(searchQuery)
        dispatch({type:FETCH_BY_SEARCH, payload:data});
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}
// creted the post
export const createPost = (post) => async(dispatch)=>{
    
    try {
        // dispatch({type: START_LOADING})
        const {data} = await api.createPosts(post);
        dispatch({type:CREATE, payload:data});
    } catch (error) {
     console.log(error);   

    // const action = {type:'FETCH_ALL',payload:[]}
}
}

// update the post through Id

export const updatePost = (id,post) => async(dispatch)=>{
    
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE, payload:data});
        dispatch({type: END_LOADING})
    } catch (error) {
     console.log(error);   

    // const action = {type:'FETCH_ALL',payload:[]}
}
}

export const deletePost = (id) => async(dispatch)=>{
    
    try { 
        await api.deletePost(id);
        dispatch({type:DELETE, payload:id});
    } catch (error) {
     console.log(error);   

    // const action = {type:'FETCH_ALL',payload:[]}
}
}

export const likePost = (id) => async(dispatch)=>{
    
    try {
        const {data} = await api.likePost(id);
        dispatch({type:LIKE, payload:data});
    } catch (error) {
     console.log(error);   

    // const action = {type:'FETCH_ALL',payload:[]}
}
}

// comment Post 

export const commentPost = (value, id) => async dispatch =>{
    try {
        const {data} = await api.comment(value,id)
        dispatch({type:COMMENT, payload: data})
        return data.comments;
    } catch (error) {
      console.log(error)   
    }
}

