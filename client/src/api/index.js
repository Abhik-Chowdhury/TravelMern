import axios from "axios"

const API = axios.create({baseURL: 'https://travelmern-api.onrender.com', headers:{'content-type': 'application/x-www-form-urlencoded'}});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token} ${JSON.parse(localStorage.getItem('profile'))?.result?.sub}`;
        // console.log(req.headers.Authorization)
    }

    return req;
})
// const url = 'http://localhost:5000/posts';


// The post segment
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPosts = (newPost) => API.post('/posts',newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`posts/${id}/likePost`)

export const comment = (value,id) => API.post(`posts/${id}/commentPost`,{value})


// The user signin and signup segment

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)