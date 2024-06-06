import { NextResponse,NextRequest} from "next/server";

export const middleware=(req:NextRequest)=>{
  const publicPaths = ['/login', '/sign-up', '/forgot-password', '/reset-password'];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
  const token=req.cookies.get('OutSiteJwt') || ""
  console.log(token,'ananna',isPublicPath,req.nextUrl.pathname)
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/dashboard',req.nextUrl))
  }
   if(!isPublicPath && !token){
     console.log('akaka')
    return NextResponse.redirect(new URL('/login',req.nextUrl))
  }
  return NextResponse.next();
}

export const config={
  matcher:['/','/login','/sign-up','/dashboard']
}