import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";
import userReducer from "./GET USER/userReducer";
import categoryReducer from "./category/categoryReducer";
import productReducer from "./PRODUCTS/productReducer";


const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer
})
export default rootReducer

