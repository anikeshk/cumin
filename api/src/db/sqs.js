const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const sqs = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function sendExportJob(userId, jobId) {
  const userId = exportJobs.get(jobId);
  if (!userId) return;

  const message = {
    type: 'export-job',
    userId,
    jobId,
  };

  const params = {
    QueueUrl: process.env.AWS_CUMIN_JOBS_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(message),
  };

  try {
    const data = await sqs.send(new SendMessageCommand(params));
    console.log('Message sent successfully:', data);
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

module.exports = { sendExportJob };
