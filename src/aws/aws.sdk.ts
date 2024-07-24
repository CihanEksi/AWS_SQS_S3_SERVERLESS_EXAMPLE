import AWS from "aws-sdk";
import environment from "../constants/environment.constant";

// AWS config
AWS.config.update({
  accessKeyId: environment.awsAccessKeyId,
  secretAccessKey: environment.awsSecretAccessKey,
  region: environment.awsRegion,
});

// SQS client
const sqs = new AWS.SQS();

const s3 = new AWS.S3();

export { sqs, s3 };
