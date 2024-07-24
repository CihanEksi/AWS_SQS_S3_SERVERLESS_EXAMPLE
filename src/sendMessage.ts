import { sqs } from "./aws/aws.sdk";
import environment from "./constants/environment.constant";

const sendSQSMessage = async (messageBody: string) => {
  // SQS queue URL and message
  sqs.sendMessage(
    {
      QueueUrl: environment.awsQueueUrl as string,
      MessageBody: messageBody,
    },
    (err, data) => {
      if (err) {
        console.log("------ERROR_START-------");
        console.error(err);
        console.log("------ERROR_STOP------");
      } else {
        console.log("------------------");
        console.log("Thumbnail message sent successfully", data.MessageId);
      }
    }
  );
};

////// EXAMPLE USAGE START

// Thumbnail message example

const messageBody = JSON.stringify({
  originalImageURL: environment.originalImageURL,
  thumbnailWidth: environment.thumbnailWidth,
  thumbnailHeight: environment.thumbnailHeight,
});

sendSQSMessage(messageBody); // This is an example of how to send a message to SQS

////// EXAMPLE USAGE END

export { sendSQSMessage }; // Export the function to be used in other files
