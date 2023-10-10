import { connect } from "dbConfig/dbConfig";
import User from "models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }
    // check if user is verified
    // if (user.isVerified !== true) {
    //   return NextResponse.json({ error: "user not verified" }, { status: 400 });
    // }
    //check if password correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password!" }, { status: 400 });
    }

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      status: 200,
    });

    return response;
  } catch (error) {
    // @ts-ignore: catch error message can be any
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
