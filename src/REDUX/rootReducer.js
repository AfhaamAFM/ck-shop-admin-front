import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";
import userReducer from "./GET USER/userReducer";


const rootReducer =combineReducers({admin:adminReducer,user:userReducer})
export default rootReducer