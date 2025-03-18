import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware (req:NextRequest){
 const token = req.cookies.get("token")?.value;
 
 if(!token){
    return NextResponse.redirect(new URL("/auth/login",req.url))
 }

 try{
   const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const tokenVerify = await jwtVerify(token,secret);
    if(tokenVerify){
        return NextResponse.next();
    }
 }catch(err){
    console.error("Invalid token:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
 }
}

export const config = {
    matcher:["/"]
}