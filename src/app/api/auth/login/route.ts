import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma';

export const POST = async(req:Request) => {
    try{

    
    const JWT_SECRET =  process.env.JWT_SECRET!;
    console.log(req.body);
    const body = await req.json();
    const {email,password} = body;
    
    console.log(JWT_SECRET + email + password + ":info");

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        return NextResponse.json({message:'User doesnt exists',status:404})
    }

    const comparePassword = bcrypt.compare(password,user.password);
    if(!comparePassword){
        return NextResponse.json({message:'Incorrect password',status:404})
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET , {
        expiresIn: '7d',
      });

      console.log(token);
      const response =  NextResponse.json({token,message:'succesful login',status:200})

      response.cookies.set("token",token ,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      })

      return response;
    }catch(err){
        return NextResponse.json({message:err,status:500})
    }

}

