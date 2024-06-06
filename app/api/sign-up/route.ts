import UserModal from "@/model/userModel";
import bcrypt from "bcryptjs";
import dbconnect from "@/config/DBConnection";
import { ApiResponse } from "@/types/apiResponse";
import {NextRequest,NextResponse} from "next/server"
import jwt from 'jsonwebtoken';
const MAX_AGE=60*60*24*30;
export async function POST(req: Request) {
  try {
  await dbconnect();
    const reqBody=await req.json();
    const { email, lastname, firstname, password } =reqBody 
    const exist = await UserModal.findOne({ email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (exist){
      return Response.json(
        { success: false, message: "Email already exist" } as ApiResponse,
        { status: 501 },
      ); 
    } 

      const verifyCodeExpire=new Date();
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      verifyCodeExpire.setDate(verifyCodeExpire.getDate() + 1);
      const User = new UserModal({
        firstName:firstname,
        lastName:lastname,
        email,
        password: hashedPassword,
        otp,
        verifyCodeExpire
      });
      await User.save();
  
    const token=jwt.sign({userId:User._id},process.env.JWT_TOKEN_SECRET,{expiresIn:MAX_AGE}) 
    const res= NextResponse.json({succes:true,message:"login successfull",data:User,token},{status:200})
     res.cookies.set("OutSiteJwt", token, { httpOnly: true, maxAge: MAX_AGE,path:'/' });
    return res;
    
  } catch (err) {
    console.log((err as Error), "when signing up post requst");
    return Response.json(
      {
        success: false,
        message: "sign-up failed",
      } as ApiResponse,
      {
        status: 500,
      },
    );
  }
}
