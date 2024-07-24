import dotenv from "dotenv";
dotenv.config();

const environment = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  awsQueueUrl: process.env.AWS_QUEUE_URL,
  originalImageURL: process.env.ORIGINAL_IMAGE_URL,
  thumbnailWidth: Number(process.env.THUMBNAIL_WIDTH),
  thumbnailHeight: Number(process.env.THUMBNAIL_HEIGHT),
  maxNumberOfMessages: Number(process.env.MAX_NUMBER_OF_MESSAGES),
  waitTimeSeconds: Number(process.env.WAIT_TIME_SECONDS),
  s3BucketName: process.env.S3_BUCKET_NAME,
  thumbnailKeyPrefix: process.env.THUMBNAIL_KEY_PREFIX,
};

for (const [key, value] of Object.entries(environment)) {
  // Basic validation you can use Joi or etc for more complex validation
  if (!value) {
    throw new Error(`"${key}" value is missing in the .env file`);
  }
}

export default environment;
