import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { prisma } from "@/lib/prisma";
import { error } from "console";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

export const POST = async(req:NextRequest)=>{

    const formData = await req.formData();

    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const candidates = [];
    let index = 0;

    while (formData.has(`candidateName-${index}`)) {
        const name = formData.get(`candidateName-${index}`) as string;
        const file = formData.get(`candidateImage-${index}`) as File;
  
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;
  
        const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
          folder: "nextjs_uploads", 
          resource_type: "auto",
        });
  
        candidates.push({
          name,
          image: uploadResponse.secure_url, // Cloudinary image URL
        });
  
        index++;
      }
  
      try{

     
      const election = await prisma.election.create({
        data:{
            title,description
        }
      })

      if(!election) return ;
     
        console.log("election created successfuly")
        const candidate = await prisma.candidate.createMany({
            data:candidates.map((candidate)=>({
                name:candidate.name,
                image:candidate.image,
                electionId:election.id
            }

            ))
        })

        if(!candidate) return

      return NextResponse.json({message:'Election created Successfully' ,status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json({message:err,status:500})
    }

}