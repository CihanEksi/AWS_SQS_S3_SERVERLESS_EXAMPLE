import { sqs } from "./aws/aws.sdk";
import environment from "./constants/environment.constant";
import { consoleError } from "./functions/console.functions";
import { saveThumbnail } from "./functions/thumbnail.functions";

const params = {
  QueueUrl: environment.awsQueueUrl as string,
  MaxNumberOfMessages: environment.maxNumberOfMessages as number,
  WaitTimeSeconds: environment.waitTimeSeconds as number,
};


const deleteMessage = async (message: any) => {
  const deleteCommand = {
    QueueUrl: params.QueueUrl,
    ReceiptHandle: message.ReceiptHandle,
  };

  try {
    await sqs.deleteMessage(deleteCommand).promise();
  } catch (error) {
    consoleError("Mesaj silinirken hata oluştu:", error);
  }
};

const receiveMessages = async () => {
  try {
    const response = await sqs.receiveMessage(params).promise();

    if (response.Messages) {
      return response.Messages;
    }
    throw new Error("Messages not found");
  } catch (error) {
    consoleError("Receive message error:", error);
  }
};

// EXAMPLE USAGE START

receiveMessages().then((messages) => {
  // you can also use async/await
  if (messages) {
    for (const message of messages) {
      const payload = JSON.parse(message.Body || "");
      const originalImageURL = payload.originalImageURL;
      const thumbnailWidth = payload.thumbnailWidth;
      const thumbnailHeight = payload.thumbnailHeight;

      saveThumbnail(originalImageURL, thumbnailWidth, thumbnailHeight);

      // Delete Message
      deleteMessage(message);
    }
  }
});

// EXAMPLE USAGE END




export { receiveMessages, deleteMessage };
