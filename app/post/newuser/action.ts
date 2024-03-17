import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

export const getSignedUrlFunction = async (type: string, user: string) => {
  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
  });

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: generateFileName(),
    Metadata: {
      userId: user,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3000,
  });

  const image = signedUrl.split("?")[0];
  return { signedUrl, image };
};
