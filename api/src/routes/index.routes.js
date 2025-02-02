const { Router } = require('express');

const ProjectRoutes = require('./project.routes');
const TaskRoutes = require('./task.routes');
const JobRoutes = require('./job.routes');

const router = Router();

router.use('/projects', ProjectRoutes);
router.use('/tasks', TaskRoutes);
router.use('/jobs', JobRoutes);

module.exports = { router };
