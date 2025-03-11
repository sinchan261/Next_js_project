import {NextRequest,NextResponse} from "next/server"
import jwt, { JwtPayload } from 'jsonwebtoken'
export const getDatafromToken=(request:NextRequest)=>{
try{
    const token=request.cookies.get("token")?.value||"";
    // console.log(token)
    const data=jwt.verify(token,"saikat") as JwtPayload;
   
    request.cookies.set("New_Data",`${data}`)
    return data.userid;
}
catch(error:any){
    throw new Error(error.message)
}



}