import mongoose from 'mongoose';

 interface UserModel extends mongoose.Document{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  isVerify:boolean;
  isAdmin:boolean;
  verifyCode:string;
  verifyCodeExpire:Date;
}
export default UserModel