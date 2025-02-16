const rds = require('../db/rds');
const { createJob, getJobsByUser } = require('../db/dynamodb');

const JobController = {
  createJob: async (req, res) => {
    try {
      let { user_id } = req.user;
      user_id = String(user_id);
      const { projectId } = req.body;
      const job = {
        user_id,
        project_id: projectId,
        filter: '*',
        status: 'Pending',
        result: '',
      };
      const createdJob = await createJob(job);
      res.status(201).json({ message: 'Job created successfully', job: createdJob });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getJobsByUser: async (req, res) => {
    try {
      let { user_id } = req.user;
      user_id = String(user_id);
      const jobs = await getJobsByUser(user_id);
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = JobController;
