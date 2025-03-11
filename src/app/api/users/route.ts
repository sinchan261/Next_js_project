import User from "@/app/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqbody = await request.json();
    const { email, password } = reqbody;
    if (!email || !password)
      return NextResponse.json(
        { message: "Fill Up The Form" },
        { status: 401 }
      );
    const userdata = await User.findOne({ email });

    if (!userdata) {
      return NextResponse.json(
        { message: "user is not exist" },
        { status: 401 }
      );
    }
    const de_password = await bcrypt.compare(password, userdata.password);
    console.log(de_password);
    if (!de_password)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    const jwt_token = await jwt.sign({userid:userdata._id}, "saikat", {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    console.log(response);
    response.headers.set(
      "Set-Cookie",
      `token=${jwt_token}; HttpOnly; Path=/; Max-Age=86400; Secure; SameSite=Strict`
    );
    (await cookies()).set("token_first",jwt_token,{
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400, 
      path:"/"
    })
    return response;

  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }

  //  const decrypt_password=await bcrypt.compare(password,userdata.password)
}
