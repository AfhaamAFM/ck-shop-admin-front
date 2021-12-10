import { combineReducers } from "redux";
import userReducer from "./GET USER/userReducer";
import categoryReducer from "./category/categoryReducer";
import productReducer from "./PRODUCTS/productReducer";
import offerReducer from "./OFFER/offerReducer";
import { orderReducer } from "./ORDERSTORE/orderReducer";
import {salesReducer} from "./ORDERSTORE/orderReducer";
import  {adminReducer,  dashboardReducer } from "./admin/adminReducer";
// import { adminReducer} from "./admin/adminReducer";


const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order:orderReducer,
    offer:offerReducer,
    sales:salesReducer,
    dashboardCount:dashboardReducer
})
export default rootReducer

