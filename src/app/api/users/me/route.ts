import User from "@/app/models/userModel";
import { getDatafromToken } from "@/helpers/GetDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest){
    try{
   const user=await getDatafromToken(request);

  const find_data=await User.findById({_id:user}).select("-password");

  return NextResponse.json({
    message:"user found",
    data:find_data
  })
    }catch(error:any){
        return NextResponse.json({error:error.message})
    }
}