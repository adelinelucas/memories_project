import * as api from '../api';
import {AUTH} from '../constants/actionsTypes';

export const signin = (formData, history) => async (dispatch) => {

    try {
        // log in te user
        const { data} = await api.signIn(formData);

        dispatch({type: AUTH, data});

        history('/');
    }catch(err){
        console.log(err)
    }
}

export const signup = (formData, history) => async (dispatch) => {

    try {
        // sign up the user
        const { data} = await api.signUp(formData);

        dispatch({type: AUTH, data});

        history('/');
    }catch(err){
        console.log(err)
    }
}