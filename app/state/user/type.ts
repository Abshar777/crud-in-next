import { PayloadAction } from '@reduxjs/toolkit';
export interface user{
    _id:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string
}
type fn=(state:user,{payload}:{payload:{}})=>void
export type reducer={
    addUser:fn,
    updateUser:fn,
    blockUser:fn,
    loginUser:fn
}