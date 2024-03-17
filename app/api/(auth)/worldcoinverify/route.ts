// Import necessary modules and types
import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect"; // Assuming this exists for MongoDB connection
import users from "@/models/users"; // Your Mongoose user model
import axios from "axios"; // For making HTTP requests

export type VerifyReply = {
  code: string;
  detail: string;
};

// Handler for API route
export const POST = async (request: Request, response: Response) => {
    try {
      // Ensure database connection
      await connect();

      // Extract data from request body
      const req = await request.json();

      // Construct request body for World ID verification endpoint
      const reqBody = {
        nullifier_hash: req.nullifier_hash, 
        merkle_root: req.merkle_root, 
        proof: req.proof, 
        verification_level: req.verification_level, 
        action: req.action, 
        signal: req.signal
      };      
      const verifyEndpoint = `${process.env.NEXT_PUBLIC_WLD_API_BASE_URL}/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`;

      // Make POST request to World ID verification endpoint
      const verifyRes = await axios.post(verifyEndpoint, reqBody);

      // Check response from World ID verification
      if (verifyRes.status === 200) {
        // Upon successful verification, update user's 'human' field in the database
        await users.findOneAndUpdate(
          { id: req.userId }, // Ensure this matches how you identify users in your database
          { $set: { human: true } },
          { new: true }
        );

        // Respond with success message
        return new NextResponse(null, { status: 201 });
      }
    } catch (error) {
      console.log(error)
      return new NextResponse("Error posting data" + error, { status: 400 });
    }
}
