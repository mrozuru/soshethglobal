import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import publishedPosts from "@/models/publishedPosts";

export const GET = async (request: Request, response: Response) => {
  try {
    await connect();

    const detail = await publishedPosts.find({}, null, {
      sort: { views: -1 },
    });

    return new NextResponse(JSON.stringify(detail), { status: 201 });
  } catch (error) {
    return new NextResponse("Error fetching data" + error, { status: 400 });
  }
};
