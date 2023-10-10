import { connect } from "dbConfig/dbConfig";
import User from "models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create token data
    const tokenData = {
      username: username,
      email: email,
    };

    //Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      token: token,
    });
    const savedUser = await newUser.save();

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
      token,
    });
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    // @ts-ignore: catch error message can be any
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
