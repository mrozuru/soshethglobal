import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios, { AxiosRequestConfig } from "axios";
import crypto from "crypto";
import { NFTStorage, File } from "nft.storage";
import {
  generateVideoThumbnails,
  importFileandPreview
} from "@rajesh896/video-thumbnails-generator";

export const uploadPost = async (files: File[], user: string) => {
  let image: string[] = [];
  let ipfsLink: string[] = [];
  let videoIds: string[] = [];

  await Promise.all(
    files.map(async (file) => {
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

      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });

      if (file.type == "video/mp4") {
        console.log("got a video!");
        var thumb = null;

        await generateVideoThumbnails(file, 0, 'image/jpeg').then((res) => {
          console.log(res);
          thumb = new File([convertDataUrlToBlob(res[0])], "myThumbnail", { type: `image/jpeg` });
        });
        // store the thumb in s3
        await axios.put(signedUrl, thumb, {
          headers: {
            "Content-Type": "image/*",
          },
        });
        const data = new FormData();
        data.append("video", file);
        const config: AxiosRequestConfig = {};

        // store the video in backend server
        const video_id = await axios.post("http://localhost:8080/", data, config);
        console.log("asdf", video_id);
        videoIds.push(video_id.data);
        image.push(signedUrl.split("?")[0]);

        if(thumb && 'type' in thumb) {
          thumb = thumb as File;
          const nft_video = {
            properties: { video: file },
            image: new Blob([thumb], { type: thumb.type }),
            name: file.name,
            description: "description",
          }
          const metadata = await client.store(nft_video);
          console.log("Metadata URI: ", metadata.url);
          ipfsLink.push(metadata.url);
        }
        

      } else {
        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        const nft = {
          image: new Blob([file], { type: file.type }),
          name: file.name,
          description: "description",
        };
        const metadata = await client.store(nft);
        console.log("Metadata URI: ", metadata.url);

        image.push(signedUrl.split("?")[0]);
        ipfsLink.push(metadata.url);
      }
    })
  );
  return { image, ipfsLink, videoIds };
};

function convertDataUrlToBlob(dataUrl: any): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};
