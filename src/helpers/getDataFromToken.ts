import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    // @ts-ignore: catch error message can be any
    const decodedToken: { id: string | number } = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    return decodedToken.id;
  } catch (error) {
    // @ts-ignore: catch error message can be any
    throw new Error(error.message);
  }
};
