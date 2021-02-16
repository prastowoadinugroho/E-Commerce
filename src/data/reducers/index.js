//root reducer for combile all reducer

import { combineReducers } from "redux";
import auth from './auth';
export default combineReducers({
    auth
});