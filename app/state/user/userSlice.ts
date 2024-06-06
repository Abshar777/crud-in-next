import { createSlice } from "@reduxjs/toolkit";
import { user ,reducer} from "./type";
import {signUp} from "./fn"

const initialState:user={
    _id:"",
    firstname:"",
    lastname:"",
    email:'',
    password:"",
    logined:false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:signUp,
        updateUser:(state,{payload})=>{},
        blockUser:(state,{payload})=>{},
    }as reducer
})

export default userSlice.reducer
export const {addUser,updateUser,blockUser} =userSlice.actions