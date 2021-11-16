import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";
import userReducer from "./GET USER/userReducer";
import categoryReducer from "./category/categoryReducer";

const rootReducer =combineReducers({admin:adminReducer,user:userReducer,category:categoryReducer})
export default rootReducer