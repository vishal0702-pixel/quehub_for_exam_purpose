import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../authsllice"


export  const  store =  configureStore ({
    reducer: {
        auth : authReducer
    }
})