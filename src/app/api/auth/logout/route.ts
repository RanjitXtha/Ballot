import { NextResponse } from "next/server";

export const GET = async(req:Request)=>{
    const response = NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),  
    });

    return response;
}