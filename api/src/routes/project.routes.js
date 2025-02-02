const { Router } = require('express');

const ProjectController = require('../controllers/project.controller');

const router = Router();

router.get('/', ProjectController.getProjects);
router.post('/', ProjectController.createProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
