import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const getUserId = async():Promise<string|undefined>=>{
    const token = (await cookies()).get("token")?.value;
    if(!token){
        console.log("token not available");
        return;
    }
    
    interface JwtPayload{
        userId:string;
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const {payload} = await jwtVerify<JwtPayload>(token,secret);

   
    console.log(payload.userId)
    return payload.userId;
}

const getUser = async()=>{

    const userId = await getUserId();
    if(!userId) return;

    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id:true,name:true,email:true,address:true,phone:true,gender:true
        }
    })

    return user;
}

type candidateType = {
    name:string,
    image:File | null
  }
  
  type ElectionType =  {
    title:string,
    description:string,
    candidates:candidateType[]
  }

const CreateElectionBallot = (electionData:ElectionType)=>{
    console.log(electionData);
}

export {getUser , CreateElectionBallot , getUserId}