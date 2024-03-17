import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import publishedPosts from "@/models/publishedPosts";

export const GET = async (request: Request, response: Response) => {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date");

    await connect();

    let detail;

    if (date) {
      detail = await publishedPosts.find({ createdAt: { $gte: date } }, null, {
        sort: { views: -1 },
      });
    } else {
      detail = await publishedPosts.find().sort({ createdAt: "desc" });
    }

    return new NextResponse(JSON.stringify(detail), { status: 201 });
  } catch (error) {
    return new NextResponse("Error fetching data" + error, { status: 400 });
  }
};
