const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');

const sqs = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function pollSQS(io) {
  try {
    const params = {
      QueueUrl: process.env.AWS_CUMIN_SQS_QUEUE_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    };
    const data = await sqs.send(new ReceiveMessageCommand(params));
    console.log('Received messages:', data.Messages);

    if (data.Messages) {
      for (const message of data.Messages) {
        const { type, userId, payload } = JSON.parse(message.Body);

        // for now, send to all connected sockets, later need to filter by userId
        // also for now if the client is not connected, the message is lost
        io.emit(type, { userId, payload });

        await sqs.send(
          new DeleteMessageCommand({
            QueueUrl: process.env.AWS_CUMIN_SQS_QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle,
          })
        );
      }
    }
  } catch (error) {
    console.error('Error polling SQS:', error);
  }

  setTimeout(() => pollSQS(io), 5000);
}

module.exports = { pollSQS };
