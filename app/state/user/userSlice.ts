import { createSlice } from "@reduxjs/toolkit";
import { user ,reducer} from "./type";

const initialState:user={
    _id:"",
    firstname:"mhd",
    lastname:"abshar",
    email:'a@gmail.com',
    password:"12467ahagha"
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,{payload})=>{},
        updateUser:(state,{payload})=>{},
        blockUser:(state,{payload})=>{},
        loginUser:(state,{payload})=>{}
    }as reducer
})

export default userSlice.reducer
export const {addUser,updateUser,blockUser,loginUser} =userSlice.actions