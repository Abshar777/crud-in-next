export interface user{
    _id?:string;
    firstname?:string;
    lastname?:string;
    email?:string;
    password?:string;
    logined?:boolean;
}
export interface fnResponse{
    success:boolean;
    msg:string 
}

export type fn<T>=(state:user,{payload}:{payload:T})=>void
export type reducer={
    addUser:fn<user>,
    updateUser:fn<user>,
    blockUser:fn<void>,
   
}