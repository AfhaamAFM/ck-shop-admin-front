import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";
import userReducer from "./GET USER/userReducer";
import categoryReducer from "./category/categoryReducer";
import productReducer from "./PRODUCTS/productReducer";
import orderReducer from "./ORDERSTORE/orderReducer";
import offerReducer from "./OFFER/offerReducer";


const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order:orderReducer,
    offer:offerReducer
})
export default rootReducer

