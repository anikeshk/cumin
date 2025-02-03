const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const sqs = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function sendNotificatinMessage(type, userId, payload) {
  const message = {
    type,
    userId,
    payload,
  };

  const params = {
    QueueUrl: process.env.AWS_CUMIN_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(message),
  };

  try {
    const data = await sqs.send(new SendMessageCommand(params));
    console.log('Message sent successfully:', data);
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

module.exports = { sendNotificatinMessage };
