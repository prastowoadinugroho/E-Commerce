import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthToken from '../../helpers/setAuthToken';
import { URLDevelopment } from '../../helpers/URL';

//type
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const USER_LOADED = 'USER_LOADED';
const AUTH_ERROR = 'AUTH_ERROR';
const LOGOUT = 'LOGOUT';
const SET_LOADING = 'SET_LOADING';

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
        case USER_LOADED:
            return {
                ...state,
                payload,
                isAuthenticated: true,
                loading: false
            }

            case REGISTER_SUCCESS:
            //set token local storage
            localStorage.getItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
            case REGISTER_FAIL:
            case AUTH_ERROR:    
            case LOGOUT:
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
export const loadUser = () => async(dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get(`${URLDevelopment}/api/user`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const register = ({name,email,password}) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    dispatch({
        type: SET_LOADING
    })
    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post(`${URLDevelopment}/api/user/register`,body,config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: SET_LOADING
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

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}