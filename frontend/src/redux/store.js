import {configureStore } from "@reduxjs/toolkit";
import userAuth from './userSlice';
import clientAuth from './clientSlice';
import adminAuth from './adminSlice';


const store = configureStore({
    reducer:{
        user:userAuth,
        client:clientAuth,
        admin:adminAuth
    }
});

export default store;