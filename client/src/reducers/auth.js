import { AUTH,LOGOUT} from "../constants/actionType";

const authReducer = (state={authData: null}, action)=>{
    switch (action.type){
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear()
            return {...state, isError:true,error:"Check your credentials"}
        default:
            return state
    }
}

export default authReducer;