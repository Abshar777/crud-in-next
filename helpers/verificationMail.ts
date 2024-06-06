import resend from '@/config/resend';
import EmailTemp from "@/app/emailTemp"
import { ApiResponse } from '@/types/apiResponse';

 const sendVerificationMail =async(email:string,username:string,otp:string):Promise<ApiResponse>=>{
  try{
    const response = await resend.emails.send({
      to: email,
      from: 'onboarding@resend.dev',
      subject: 'Verification Code',
      react: EmailTemp({username,otp})
    })
    return {
      success: true,
      message: "Verification mail sent successfully",
      data: response
    }
  }catch(err){
    console.log((err as Error).message,"when sending verification email ")
    return {
      success:false,
      message:"Verfication mailed failed"
    }
  }
}
export default sendVerificationMail;