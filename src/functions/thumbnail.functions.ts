import { Readable } from "stream";
import environment from "../constants/environment.constant";
import { uploadFile } from "./bucket.functiıns";
import { consoleError } from "./console.functions";
import sharp from "sharp";

const saveThumbnail = async (
  originalImageURL: string,
  thumbnailWidth: number,
  thumbnailHeight: number
) => {
  // get the original image
  const response = await fetch(originalImageURL);

  if (!response.ok) {
    consoleError(`Image download failed: ${originalImageURL}`);
    throw new Error("Image download failed");
  }

  const buffer = await response.arrayBuffer();

  // Create a thumbnail

  const thumbnailBuffer = await sharp(buffer)
    .resize(thumbnailWidth, thumbnailHeight, {
      fit: "contain",
    })
    .toBuffer();

  const thumbnailStream = new Readable();
  thumbnailStream.push(thumbnailBuffer);
  thumbnailStream.push(null);
  const ext = originalImageURL.split(".").pop();
  const thumbnailKey =
    (environment.thumbnailKeyPrefix as string) + Date.now() + "." + ext;
  const uploadResponse = await uploadFile({
    Bucket: environment.s3BucketName as string,
    Key: thumbnailKey,
    Body: thumbnailStream,
    ContentType: "image/jpg",
  });

  return uploadResponse;
};

export { saveThumbnail };
