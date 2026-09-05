import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);
export default auth((req) => {
    const session = req.auth;
    console.log("middleware session:", session);  
    if(req.nextUrl.pathname.startsWith("/admin")){
        if(!session || session.user.type !== "ADMIN"){
            return NextResponse.redirect(new URL("/",req.url))
        }
    }
    if(req.nextUrl.pathname.startsWith("/mypage")){
        if(!session){
            return NextResponse.redirect(new URL("/",req.url));
        }
    }
});
export const config = {
    matcher: ["/admin/:path*", "/mypage/:path*"],
  };
