const { Router } = require('express');

const ProjectRoutes = require('./project.routes');
const TaskRoutes = require('./task.routes');

const router = Router();

router.use('/projects', ProjectRoutes);
router.use('/tasks', TaskRoutes);

module.exports = { router };
