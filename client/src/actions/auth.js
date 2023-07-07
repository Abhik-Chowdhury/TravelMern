import { AUTH } from '../constants/actionType'
import * as api from '../api/index.js'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in user..
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data });
        navigate('/')
    } catch (error) {
        console.log(error.message)
        
        alert("Chech your creadentials")

    }
}
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up user..
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data });
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

