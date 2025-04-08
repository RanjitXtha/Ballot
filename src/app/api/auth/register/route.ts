import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export const POST = async(req:Request) => {
    console.log(req.body)
    try{
    const body = await req.json();
    console.log("req received");
    const { name, email, password, phone, address , gender } = body;

    const existingUser = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(existingUser){
        return NextResponse.json({message: "User already exists",status:400});
       
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data:{
            name,email,password:hashedPassword,image:'',phone,address, gender
        }
    })

    return NextResponse.json({message:"User created successfully",status:200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Something went wrong",status:500});
    }
}

