import { FETCH_ALL,COMMENT,CREATE,UPDATE,LIKE,DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST} from "../constants/actionType";

export default (state={isLoading:true, posts:[]}, action) => {
    switch (action.type){
        case START_LOADING:
            return {...state,isLoading:true};
        case END_LOADING:
            return {...state,isLoading:false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages:action.payload.numberOfPages,
                };
        case CREATE:
            return {...state,posts:[...state.posts,action.payload]};
        case FETCH_POST:
            return { ...state, post: action.payload};
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload};
        case UPDATE:
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))} ;
        case LIKE:
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
        case COMMENT:
            return { ...state, posts: state.posts.map((post)=>{
                // all the other posts
                // change post that recently receive comment
                
                if(post._id === action.payload._id){
                    return action.payload;
                }

                return post;
            })}
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload )};
        default:
            return state;
    }
}

// import { createSlice } from '@reduxjs/toolkit';

// const stateSlice = createSlice({
//   name: 'state',
//   initialState: [],
//   reducers: {
//     fetchAll(state, action) {
//       return state;
//     },
//     create(state, action) {
//       return state;
//     },
//   },
// });

// export const { fetchAll, create } = stateSlice.actions;
// export default stateSlice.reducer;
