const { Router } = require('express');

const TaskController = require('../controllers/task.controller');

const router = Router();

router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTask);
router.put('/', TaskController.updateTask);
router.delete('/', TaskController.deleteTask);

router.get('/project/:id', TaskController.getTasksByProject);

module.exports = router;
