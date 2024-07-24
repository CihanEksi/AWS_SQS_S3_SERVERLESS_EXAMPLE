import { s3 } from "../aws/aws.sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { consoleError } from "./console.functions";

const uploadFile = async (putObjectCommand: PutObjectRequest) => {
  try {
    const upload = await s3.upload(putObjectCommand).promise();
    return upload;
  } catch (error) {
    consoleError("Upload error:", error);
    throw new Error("Upload error");
  }
};

export { uploadFile };
