// sumit

import {configureStore} from "@reduxjs/toolkit"
import HamReducer from "./slices/hamSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer:{   
        ham:HamReducer,
        user:userReducer    

    }
})

export default store;