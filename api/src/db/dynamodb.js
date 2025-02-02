const { v4: uuidv4 } = require('uuid');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TASKS_TABLE_NAME = 'tasks';
const JOBS_TABLE_NAME = 'jobs';

const getTask = async (project_id, task_id) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { project_id, task_id },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
};

const createTask = async (task) => {
  let taskId;
  let taskExists = true;

  while (taskExists) {
    taskId = uuidv4();
    task.task_id = taskId;

    taskExists = await getTask(task.project_id, taskId);
  }

  const params = {
    TableName: TASKS_TABLE_NAME,
    Item: task,
  };

  await docClient.send(new PutCommand(params));
  return task;
};

const getTasksByProject = async (project_id) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    KeyConditionExpression: 'project_id = :pid',
    ExpressionAttributeValues: {
      ':pid': project_id,
    },
  };
  const result = await docClient.send(new QueryCommand(params));
  return result.Items;
};

const updateTask = async (project_id, task_id, updates) => {
  let updateExpression = 'set ';
  const expressionAttributes = {};
  Object.keys(updates).forEach((key, index) => {
    updateExpression += `${key} = :val${index}, `;
    expressionAttributes[`:val${index}`] = updates[key];
  });
  updateExpression = updateExpression.slice(0, -2); // Remove last comma

  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { project_id, task_id },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributes,
    ReturnValues: 'UPDATED_NEW',
  };
  const result = await docClient.send(new UpdateCommand(params));
  return result.Attributes;
};

const deleteTask = async (project_id, task_id) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { project_id, task_id },
  };
  await docClient.send(new DeleteCommand(params));
  return { message: 'Task deleted' };
};

const getJob = async (user_id, job_id) => {
  const params = {
    TableName: JOBS_TABLE_NAME,
    Key: { user_id, job_id },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
};

const createJob = async (job) => {
  let jobId;
  let jobExists = true;

  while (jobExists) {
    jobId = uuidv4();
    job.job_id = jobId;

    jobExists = await getJob(job.user_id, jobId);
  }

  const params = {
    TableName: JOBS_TABLE_NAME,
    Item: job,
  };

  await docClient.send(new PutCommand(params));
  return job;
};

const getJobsByUser = async (user_id) => {
  const params = {
    TableName: JOBS_TABLE_NAME,
    KeyConditionExpression: 'user_id = :uid',
    ExpressionAttributeValues: {
      ':uid': user_id,
    },
  };
  const result = await docClient.send(new QueryCommand(params));
  return result.Items;
};

module.exports = {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask,
  getJob,
  createJob,
  getJobsByUser,
};
