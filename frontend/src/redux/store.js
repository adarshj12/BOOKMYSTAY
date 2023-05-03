import {configureStore } from "@reduxjs/toolkit";
import userAuth from './userSlice';
import clientAuth from './clientSlice';
import adminAuth from './adminSlice';
import searchReducer from "./searchSlice";


const store = configureStore({
    reducer:{
        user:userAuth,
        client:clientAuth,
        admin:adminAuth,
        search:searchReducer
    }
});

export default store;