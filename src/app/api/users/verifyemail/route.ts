import User from "@/app/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request:NextRequest){
    try{
const reqbody=await request.json()
const {token}=reqbody;
console.log(token)
const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
if(!user){
    return NextResponse.json({error:"Invailid token"},{status:400})
}
console.log(user)
user.isVerified=true;
user.verifyToken=undefined;
user.verifyTokenExpiry=undefined;
await user.save();
return  NextResponse.json({
    message:"Email Verified successfully",
    success:true
})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}