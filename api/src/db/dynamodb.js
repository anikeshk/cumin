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
const TABLE_NAME = 'tasks';

const createTask = async (task) => {
  let taskId;
  let taskExists = true;

  while (taskExists) {
    taskId = uuidv4();
    task.task_id = taskId;

    taskExists = await getTask(task.project_id, taskId);
  }

  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };

  await docClient.send(new PutCommand(params));
  return task;
};

const getTasksByProject = async (project_id) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'project_id = :pid',
    ExpressionAttributeValues: {
      ':pid': project_id,
    },
  };
  const result = await docClient.send(new QueryCommand(params));
  return result.Items;
};

const getTask = async (project_id, task_id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { project_id, task_id },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
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
    TableName: TABLE_NAME,
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
    TableName: TABLE_NAME,
    Key: { project_id, task_id },
  };
  await docClient.send(new DeleteCommand(params));
  return { message: 'Task deleted' };
};

module.exports = { createTask, getTasksByProject, getTask, updateTask, deleteTask };
