import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { adminReducer, userReducer } from "./usersReducer";


const reducers = combineReducers({
    users: userReducer,
    admin: adminReducer,
    products: productReducer
})

export default reducers;