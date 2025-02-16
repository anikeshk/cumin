const {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask,
} = require('../db/dynamodb');
const { sendNotificatinMessage } = require('../db/sqs');

const TaskController = {
  async createTask(req, res) {
    try {
      // add label, assignee and other fields
      const { project_id } = req.query;
      const { title, description, status, priority } = req.body;
      const newTask = {
        project_id,
        title,
        description,
        taskStatus: status,
        priority,
      };
      const createdTask = await createTask(newTask);
      const task = {
        id: createdTask.task_id,
        projectId: createdTask.project_id,
        title: createdTask.title,
        description: createdTask.description,
        status: createdTask.taskStatus,
        priority: createdTask.priority,
      };
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTasksByProject(req, res) {
    try {
      const { id } = req.params;
      const rawTasks = await getTasksByProject(id);
      let tasks = [];
      if (rawTasks.length > 0) {
        tasks = rawTasks.map((task) => {
          return {
            id: task.task_id,
            projectId: task.project_id,
            title: task.title,
            description: task.description,
            status: task.taskStatus,
            priority: task.priority,
          };
        });
      }
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTask(req, res) {
    try {
      const { id } = req.params;
      const { project_id } = req.query;
      const task = await getTask(project_id, id);
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateTask(req, res) {
    try {
      // add label, assignee and other fields
      const { project_id, task_id } = req.query;
      const updates = req.body;
      if (updates.status) {
        updates.taskStatus = updates.status;
        delete updates.status;
        delete updates.projectId;
        delete updates.id;
      }
      await updateTask(project_id, task_id, updates);
      const updatedTask = await getTask(project_id, task_id);
      const task = {
        id: updatedTask.task_id,
        projectId: updatedTask.project_id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.taskStatus,
        priority: updatedTask.priority,
      };

      const payload = {
        project_id,
        task_id,
        updates,
      };
      //await sendNotificatinMessage('task:updated', user_id, payload);

      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const { project_id, task_id } = req.query;
      await deleteTask(project_id, task_id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TaskController;
