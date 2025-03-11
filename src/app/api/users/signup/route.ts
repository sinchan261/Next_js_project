import User from "@/app/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Connect to the database once when this route is initialized

export async function POST(request: NextRequest) {
  connect();
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;

    console.log(reqbody);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);
    //send verfication email
    const st = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });
    console.log(st);
    return NextResponse.json(
      { message: "User is created", user: newUser, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
