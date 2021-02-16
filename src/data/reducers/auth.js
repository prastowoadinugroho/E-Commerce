import axios from 'axios';
import { toast } from 'react-toastify';
import { URLDevelopment } from '../../helpers/URL';

//type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

//initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

//reducers
/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case REGISTER_SUCCESS:
        //set token local storage
        localStorage.getItem('token', payload.token);
        return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false,
        };
        case REGISTER_FAIL:
        //remove token local storage
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
        };
        default:
            return state;
    }
}

//actions
export const register = ({name,email,password}) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post(`${URLDevelopment}/api/user/register`,body,config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => toast.error(error.msg))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}