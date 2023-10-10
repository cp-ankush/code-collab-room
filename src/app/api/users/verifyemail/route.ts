import { NextRequest, NextResponse } from "next/server";
import { connect } from "dbConfig/dbConfig";
import User from "models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      token: token,
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    const response = NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });

    return response;
    // return NextResponse.redirect(new URL("/login"));
  } catch (error) {
    // @ts-ignore: catch error message can be any
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
