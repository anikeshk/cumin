const {
  createTask,
  getTasksByProject,
  getTask,
  updateTask,
  deleteTask,
} = require('../db/dynamodb');

const { TASK_STATUS, TASK_PRIORITY } = require('../constants/constants');

const TaskController = {
  async createTask(req, res) {
    try {
      // add label, assignee and other fields
      const { project_id, name, description } = req.body;
      const task = {
        project_id,
        name,
        description,
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.LOW,
      };
      const createdTask = await createTask(task);
      res.status(201).json({ message: 'Task created successfully', task: createdTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTasksByProject(req, res) {
    try {
      const { id } = req.params;
      const tasks = await getTasksByProject(id);
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
      const task = await updateTask(project_id, task_id, updates);
      res.status(200).json({ message: 'Task updated successfully', task });
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
