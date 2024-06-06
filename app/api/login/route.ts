import UserModal from "@/model/userModel";
import bcrypt from "bcryptjs";
import dbconnect from "@/config/DBConnection";
import jwt from 'jsonwebtoken';
import {serialize} from "cookie"
import { NextResponse,NextRequest} from "next/server";
const MAX_AGE=60*60*24*30;

export async function POST(req: NextRequest){
  try{
    await dbconnect();
    const reqBody=await req.json();
    const {email,password} =reqBody;
    const user = await UserModal.findOne({ email });
    // user note exist
    if(!user) return NextResponse.json({succes:false,message:"user not found"},{status:401});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return NextResponse.json({succes:false,message:"wrong password"},{status:401});
    const token=jwt.sign({userId:user._id},process.env.JWT_TOKEN_SECRET,{expiresIn:MAX_AGE}) 
    const res= NextResponse.json({succes:true,message:"login successfull",data:user,token},{status:200})
     res.cookies.set("OutSiteJwt", token, { httpOnly: true, maxAge: MAX_AGE,path:'/' });
    return res;
  }catch(err){
    return NextResponse.json({
      success:false,
      message:"login failed   "+ (err as Error).message,
    },{ status:400})
  }
}