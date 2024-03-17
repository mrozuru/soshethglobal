import type { NextApiRequest, NextApiResponse } from "next";
import users from "@/models/users"; 

export const config = {
  api: {
    externalResolver: true,
  },
};

export type VerifyReply = {
  code: string;
  detail: string;
};

const verifyEndpoint = `${process.env.NEXT_PUBLIC_WLD_API_BASE_URL}/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyReply>
) {
  //   return new Promise((resolve, reject) => {
  console.log("Received request to verify credential:\n", req.body);
  const reqBody = {
    nullifier_hash: req.body.nullifier_hash,
    merkle_root: req.body.merkle_root,
    proof: req.body.proof,
    verification_level: req.body.verification_level,
    action: req.body.action,
    signal: req.body.signal,
  };
  console.log("Sending request to World ID /verify endpoint:\n", reqBody);
  fetch(verifyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  }).then((verifyRes) => {
    verifyRes.json().then((wldResponse) => {
      console.log(
        `Received ${verifyRes.status} response from World ID /verify endpoint:\n`,
        wldResponse
      );
      if (verifyRes.status == 200) {
        
        const userId = req.body.userId; // Make sure you receive userId from the request body or find another way to pass it
            users.findOneAndUpdate(
                { id: userId }, // Assuming 'id' matches the Privy's userId
                { $set: { human: true } },
                // (err: any, updatedUser: any) => {
                //     if (err) {
                //         console.error("Failed to update user:", err);
                //         return res.status(500).json({ message: "Failed to update user" });
                //     }
                //     console.log("User updated successfully:", updatedUser);
                //     res.status(200).json({ message: "User verified and updated successfully" });
                // }
            );

        console.log(
          "Credential verified! This user's nullifier hash is: ",
          wldResponse.nullifier_hash
        );
        res.status(verifyRes.status).send({
          code: "success",
          detail: "This action verified correctly!",
        });
        //   resolve(void 0);
      } else {
        // This is where you should handle errors from the World ID /verify endpoint. Usually these errors are due to an invalid credential or a credential that has already been used.
        // For this example, we'll just return the error code and detail from the World ID /verify endpoint.
        res
          .status(verifyRes.status)
          .send({ code: wldResponse.code, detail: wldResponse.detail });
      }
    });
  });
  //   });
}
