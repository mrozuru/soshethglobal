import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import publishedPosts from "@/models/publishedPosts";

export const GET = async (request: Request, response: Response) => {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    await connect();

    const detail = await publishedPosts
      .find({ userId: userId })
      .sort({ createdAt: "desc" });

    return new NextResponse(JSON.stringify(detail), { status: 201 });
  } catch (error) {
    return new NextResponse("Error fetching data" + error, { status: 400 });
  }
};
